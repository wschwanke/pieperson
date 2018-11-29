/**
 * External dependencies
 */
import { config } from 'dotenv';
import 'isomorphic-fetch';
import { MongoClient } from 'mongodb';

/**
 * Internal dependencies
 */
import mongo from './lib/database';
import { logger } from './lib/logger';
import parseStashes from './lib/stashParser';

// Initialize our environment variables with dotenv
config({ path: 'indexer/env/.env' });

interface IIndexer {
  nextId: string;
  mongoClient: MongoClient;
}

class StashIndexer implements IIndexer {
  nextId = '';
  mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.nextId = '';
    this.mongoClient = mongoClient;
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
      setTimeout(this.getStashTabsLoop, 750);
    } catch (err) {
      // getStashTabs Error
      logger.error(err);
      if (err.response.status === 429) {
        const retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2], 10) * 1000;
        logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`);
        setTimeout(this.getStashTabsLoop, retryTimer);
      }
      logger.error(`getStashTabsLoop - getStashTabs: ${err.response.status}`);
      logger.debug(`getStashTabsLoop - getStashTabs: ${err.response}`);
    }
  }
}

/**
 * Waits to connect to the mongo database and then passes the mongo client into our indexer
 */
async function init() {
  try {
    const mongoClient: MongoClient = await mongo.connect();
    const Indexer = new StashIndexer(mongoClient);
    Indexer.init();
  } catch (err) {
    logger.error(`${err}`);
  }
}

// Start the indexer
init();
