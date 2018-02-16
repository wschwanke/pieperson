const axios = require('axios');
const logger = require('./lib/logger');
const stashParser = require('./lib/stashParser');
const db = require('./models');

const runIndexer = {}

runIndexer.init = () => {
  let nextId = 0;

  setInterval(() => {
    axios.get(`http://api.pathofexile.com/public-stash-tabs?id=${nextId}`, {
      headers: { 'Content-Encoding': 'gzip' }
    })
    .then((response) => {
      let stashes = response.data.stashes;
      let nextId = response.data.next_change_id;

      stashParser.parseStashes(stashes);
      logger.info(`Fetched ${response.data.stashes.length} stash tabs. Next ID is ${nextId}`);
    })
    .catch((err) => {
      logger.error(err);
    });
  }, 5000);
};

runIndexer.init();
