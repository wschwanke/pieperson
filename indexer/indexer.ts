/**
 * External dependencies
 */
import * as dotenv from 'dotenv';
import 'isomorphic-fetch';
import { MongoClient } from 'mongodb';

/**
 * Internal dependencies
 */
import mongo from './lib/database';
import { logger } from './lib/logger';
import parseStashes from './lib/stashParser';

dotenv.config({ path: 'indexer/env/.env' });

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

  async init() {
    try {
      const poeNinjaResponse: any = await this.getPoeNinjaNextChangeId();
      logger.verbose('Received next change ID from POE Ninja.');
      this.nextId = poeNinjaResponse.data.next_change_id;
      logger.info('Starting Indexer.');
      this.getStashTabsLoop();
    } catch (err) {
      logger.error(`POE Ninja API request error: ${err}`);
    }
  }

  async getPoeNinjaNextChangeId() {
    logger.silly('Sending request to POE Ninja.');

    return fetch(`https://poe.ninja/api/data/getstats`, {
      headers: { 'Content-Encoding': 'gzip' },
    });
  }

  async getStashTabs() {
    logger.silly('Sending request to Path of Exile API.');

    return fetch(`http://api.pathofexile.com/public-stash-tabs?id=${this.nextId}`, {
      headers: { 'Content-Encoding': 'gzip' },
    })
      .then((poeStashTabResponse: any) => {
        logger.silly(`POE Stash Tab Request Successful`);
        return poeStashTabResponse;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getStashTabsLoop() {
    return this.getStashTabs()
      // getStashTabs Success
      .then((poeStashTabResponse: any) => {
        const stashes = poeStashTabResponse.data.stashes;
        this.nextId = poeStashTabResponse.data.next_change_id;

        logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${this.nextId}`);
        return parseStashes(stashes);
      }, (err) => {
        // getStashTabs Error
        logger.error(err);
        if (err.response.status === 429) {
          const retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2], 10) * 1000;
          logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`);
          setTimeout(this.getStashTabsLoop, retryTimer);
        }
        logger.error(`getStashTabsLoop - getStashTabs: ${err.response.status}`);
        logger.debug(`getStashTabsLoop - getStashTabs: ${err.response}`);
        throw err;
      })
      .then((parseFinished) => {
        setTimeout(this.getStashTabsLoop, 750);
        logger.silly('Set timeout on getStashTabsLoop()');
        return parseFinished;
      }, (err) => {
        throw err;
      });
  }
}

// Boot it up
mongo.connect()
.then((client: MongoClient) => {
  const Indexer = new StashIndexer(client);
  Indexer.init();
  return;
}, (err: Error) => {
  logger.error(`${err}`);
});
