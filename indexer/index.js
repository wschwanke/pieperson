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
  indexer.getPoeNinjaNextChangeId()
    .then((poeNinjaResponse) => {
      indexer.getStashTabsLoop();
    })
};

indexer.getPoeNinjaNextChangeId = () => {
  logger.info('Sending request to POE Ninja.');
  return axios.get(`http://api.poe.ninja/api/Data/GetStats`, {
    headers: { 'Content-Encoding': 'gzip' }
  })
    .then((poeNinjaResponse) => {
      logger.debug('Received next change ID from POE Ninja.');
      indexer.nextId = poeNinjaResponse.data.next_change_id;
    })
    .catch((err) => {
      logger.error(`POE Ninja API request error: ${err}`);
    });
}

indexer.getStashTabs = () => {
  logger.debug('Request sent to Path of Exile API.');
  return axios.get(`http://api.pathofexile.com/public-stash-tabs?id=${indexer.nextId}`, {
    headers: { 'Content-Encoding': 'gzip' }
  })
    .then((poeStashTabResponse) => {
      logger.debug(`Response: ${poeStashTabResponse.status}`);
      logger.debug(`POE Stash Tab Request Successful`);
      return poeStashTabResponse;
    }).catch((err) => {
      logger.error(`POE Stash Tab API Error: ${err}`);
      return err;
    });
}

indexer.getStashTabsLoop = () => {
  indexer.getStashTabs()
    .then((poeStashTabResponse) => {
      let stashes = poeStashTabResponse.data.stashes;
      indexer.nextId = poeStashTabResponse.data.next_change_id;

      logger.info(`Fetched ${stashes.length} stash tabs. Next ID is ${indexer.nextId}`);
      return stashParser.parseStashes(stashes);
    })
    .then((parseFinished) => {
      setTimeout(indexer.getStashTabsLoop, 1000);
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 429) {
        setTimeout(indexer.getStashTabsLoop, 6050);
      }
    });
};

// Boot it up
mongo.connect()
.then((client) => {
  indexer.init();
});
