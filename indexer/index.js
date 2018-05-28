// Setup the ENV variables for local development. Remove this is production.
const dotenv = require('dotenv').config({ path: 'indexer/env/.env' });

if (dotenv.error) {
  throw dotenv.error;
}

const axios = require('axios');
const logger = require('./lib/logger');
const stashParser = require('./lib/stashParser');
const mongo = require('./lib/database');

const indexer = {}


indexer.nextId = '';

indexer.init = () => {
  return indexer.getPoeNinjaNextChangeId()
    .then((poeNinjaResponse) => {
      logger.verbose('Received next change ID from POE Ninja.');
      indexer.nextId = poeNinjaResponse.data.next_change_id;
      logger.info('Starting Indexer.');

      return indexer.getStashTabsLoop();
    }, (err) => {
      logger.error(`POE Ninja API request error: ${err}`);

      throw err;
    })
};

indexer.getPoeNinjaNextChangeId = () => {
  logger.verbose('Sending request to POE Ninja.');

  return axios.get(`https://poe.ninja/api/data/getstats`, {
    headers: { 'Content-Encoding': 'gzip' }
  });
}

indexer.getStashTabs = () => {
  logger.verbose('Sending request to Path of Exile API.');
  
  return axios.get(`http://api.pathofexile.com/public-stash-tabs?id=${indexer.nextId}`, {
    headers: { 'Content-Encoding': 'gzip' }
  })
    .then((poeStashTabResponse) => {
      logger.verbose(`POE Stash Tab Request Successful`);
      return poeStashTabResponse;
    })
    .catch((err) => {
      throw err;
    });
}

indexer.getStashTabsLoop = () => {
  return indexer.getStashTabs()
    // getStashTabs Success
    .then((poeStashTabResponse) => {
      let stashes = poeStashTabResponse.data.stashes;
      indexer.nextId = poeStashTabResponse.data.next_change_id;

      logger.verbose(`Fetched ${stashes.length} stash tabs. Next ID is ${indexer.nextId}`);
      return stashParser.parseStashes(stashes);
    }, (err) => {
      // getStashTabs Error
      console.log(err)
      if (err.response.status === 429) {
        let retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2]) * 1000;
        logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`)
        setTimeout(indexer.getStashTabsLoop, retryTimer);
      }
      logger.error(`getStashTabsLoop - getStashTabs: ${err.response.status}`);
      logger.debug(`getStashTabsLoop - getStashTabs: ${err.response}`);
      throw err;
    })
    .then((parseFinished) => {
      setTimeout(indexer.getStashTabsLoop, 750);
      logger.silly('Set timeout on getStashTabsLoop()');
      return parseFinished;
    }, (err) => {
      throw err;
    })
};

// Boot it up
mongo.connect()
.then((client) => {
  indexer.init();
  return;
}, (err) => {
  logger.error(`${err}`);
});
