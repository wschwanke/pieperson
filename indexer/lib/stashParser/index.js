const itemController = require('../../controllers').itemController;
const stashController = require('../../controllers').stashController;
const logger = require('../logger');
const mongo = require('../database')

const stashParser = {};

stashParser.parseStashes = (publicStashes) => {
  return new Promise((resolve, reject) => {
      // Loop through all stash tabs
      for (let stashIndex = 0; stashIndex < publicStashes.length; stashIndex++) {
        let accountName = publicStashes[stashIndex].accountName;
        let lastCharacterName = publicStashes[stashIndex].lastCharacterName;
        let stashId = publicStashes[stashIndex].id;
        let stashName = publicStashes[stashIndex].stash;
        let stashType = publicStashes[stashIndex].stashType;
        let isPublic = publicStashes[stashIndex].public;
        let items = publicStashes[stashIndex].items;

        // Search the database to see if the stashId already exists.
        stashController.findStash(stashId)
          .then((stash) => {
            // If stash === null add the new stash into the db
            if (stash === null) {
              return stashController.addStash(accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items)
                .then((stash) => {
                  return stash;
                }, (err) => {
                  logger.error(`parseStashes - stashController.addStash(): ${err}`);
                  return err;
                });
            }
            // Update the old stash tab with the new data
            return stashController.updateStash(accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items)
              .then((stash) => {
                  return stash;
                }, (err) => {
                  logger.error(`parseStashes - stashController.addStash(): ${err}`);
                  return err;
                });
          }, (err) => {
            logger.error(`parseStashes - stashController.findStash(): ${err}`);
            return err;
          })
      }
    resolve('Stash tabs parsing complete.');
  });
};

module.exports = stashParser;
