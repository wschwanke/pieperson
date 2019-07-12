/**
 * External dependencies
 */
import { config } from 'dotenv';
import 'isomorphic-fetch';

// Initialize our environment variables with dotenv
config({ path: 'indexer/env/.env' });

/**
 * Internal dependencies
 */
import { nextChangeIdController } from '@Controllers/next-change-id';
import { database } from '@Lib/database';
import { logger } from '@Lib/logger';
import { parseStashes } from '@Lib/stash-parser';

interface IIndexer {
  nextId: string;
}

class StashIndexer implements IIndexer {
  nextId = '';

  constructor() {
    this.nextId = '';
  }

  /**
   * Initializes the StashIndexer
   * @async
   */
  async init() {
    try {
      const poeNinjaResponse: any = await this.getPoeNinjaNextChangeId();
      logger.verbose('Received next change ID from POE Ninja.');
      const poeNinjaResponseJSON: any = await poeNinjaResponse.json();
      this.nextId = poeNinjaResponseJSON.next_change_id;

      logger.info('Starting Indexer.');
      this.getStashTabsLoop();
    } catch (err) {
      logger.error(`POE Ninja API request error: ${err}`);
    }
  }

  /**
   * Fetches the current next id from POE Ninja.
   * @async
   * @return {Promise} The stashes from the API
   */
  async getPoeNinjaNextChangeId() {
    logger.silly('Sending request to POE Ninja.');
    try {
      return fetch(`https://poe.ninja/api/data/getstats`, {
        headers: { 'Content-Encoding': 'gzip' },
      });
    } catch (err) {
      logger.error(err);
      return err;
    }
  }

  /**
   * Fetches stash tab data from the Path of Exile public API.
   * @async
   * @return {Promise} The stashes from the API
   */
  async getStashTabs() {
    logger.silly('Sending request to Path of Exile API.');
    try {
      return await fetch(`http://api.pathofexile.com/public-stash-tabs?id=${this.nextId}`, {
        headers: { 'Content-Encoding': 'gzip' },
      });
    } catch (err) {
      logger.error(err);
      return err;
    }
  }

  /**
   * Handles calling the fetch for all the stash tabs and then handles the call to parse the fetched data
   * @async
   */
  getStashTabsLoop = async () => {
    try {
      const poeStashTabResponse = await this.getStashTabs();
      const poeStashTabResponseJSON = await poeStashTabResponse.json();
      const stashes = poeStashTabResponseJSON.stashes;

      this.nextId = poeStashTabResponseJSON.next_change_id;
      logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${this.nextId}`);
      await parseStashes(stashes);
      setTimeout(this.getStashTabsLoop, 10000);
    } catch (err) {
      // getStashTabs Error
      logger.error(err);
      if (err.response.status === 429) {
        const retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2], 10) * 1000;
        logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`);
        setTimeout(this.getStashTabsLoop, retryTimer);
      }
      // logger.error(`getStashTabsLoop - getStashTabs: ${err.response.status}`);
      // logger.debug(`getStashTabsLoop - getStashTabs: ${err.response}`);
    }
  }
}

const getNextChangeId = async () => {
  let nextChangeId: any[] = [];
  try {
    // First try and get the next change id from the database
    nextChangeId = await nextChangeIdController.find();
    // If the database fails to return an id then pull it from POE Ninja

  } catch (error) {
    logger.error('Could not find next change id');
    logger.error(error);
  }
};

/**
 * Main function that initially connects to the database and
 * then boots up the indexer loop.
 */
const main = async () => {
  try {
    await database.connect();
    getNextChangeId();
    const Indexer = new StashIndexer();
    Indexer.init();
  } catch (err) {
    logger.error(`${err}`);
  }
};

// Start the indexer
main();

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
});

process.on('SIGTERM', () => {
  // Disconnect from the database when the application shutsdown
  database.disconnect();
});
