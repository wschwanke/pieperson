// Setup the ENV variables for local development. Remove this is production.
const dotenv = require('dotenv').config({ path: 'indexer/env/.env' });

if (dotenv.error) {
  throw dotenv.error;
}

const axios = require('axios');
const db = require('./models');
const logger = require('./lib/logger');
const stashParser = require('./lib/stashParser');

const indexer = {}

indexer.init = () => {
  let nextId = 0;

  setInterval(() => {
    axios.get(`http://api.pathofexile.com/public-stash-tabs?id=${nextId}`, {
      headers: { 'Content-Encoding': 'gzip' }
    })
    .then((response) => {
      let stashes = response.data.stashes;
      nextId = response.data.next_change_id;

      stashParser.parseStashes(stashes);
      logger.info(`Fetched ${stashes.length} stash tabs. Next ID is ${nextId}`);
    })
    .catch((err) => {
      logger.error(err);
    });
  }, 5000);
};

indexer.init();
