/**
 * External dependencies
 */
import { MongoClient } from 'mongodb';
import axios from 'axios';
import dotenv from 'dotenv';

/**
 * Internal dependencies
 */
import { logger } from './lib/logger';
import parseStashes from './lib/stashParser';
import mongo from './lib/database';

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
    } catch(err) {
      logger.error(`POE Ninja API request error: ${err}`);
    }
  }

  async getPoeNinjaNextChangeId() {
    logger.silly('Sending request to POE Ninja.');

    return axios.get(`https://poe.ninja/api/data/getstats`, {
      headers: { 'Content-Encoding': 'gzip' }
    });
  }

  async getStashTabs() {
    logger.silly('Sending request to Path of Exile API.');

    return axios.get(`http://api.pathofexile.com/public-stash-tabs?id=${this.nextId}`, {
      headers: { 'Content-Encoding': 'gzip' }
    })
      .then((poeStashTabResponse) => {
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
      .then((poeStashTabResponse) => {
        let stashes = poeStashTabResponse.data.stashes;
        this.nextId = poeStashTabResponse.data.next_change_id;

        logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${this.nextId}`);
        return parseStashes(stashes);
      }, (err) => {
        // getStashTabs Error
        console.log(err)
        if (err.response.status === 429) {
          let retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2]) * 1000;
          logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`)
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
