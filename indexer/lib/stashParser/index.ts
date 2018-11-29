const itemController = require('../../controllers').itemController;
const stashController = require('../../controllers').stashController;
const logger = require('../logger');
const mongo = require('../database')

const stashParser = {};

stashParser.parseStashes = (publicStashes) => {
  // const ignoreLeagues = ['Standard', 'Hardcore'];
  const ignoreLeagues = ['Hardcore']

  // Loop through all stash tabs
  for (let stashIndex = 0; stashIndex < publicStashes.length; stashIndex++) {
    let accountName = publicStashes[stashIndex].accountName;
    let lastCharacterName = publicStashes[stashIndex].lastCharacterName;
    let stashId = publicStashes[stashIndex].id;
    let stashName = publicStashes[stashIndex].stash;
    let stashType = publicStashes[stashIndex].stashType;
    let isPublic = publicStashes[stashIndex].public;
    let items = publicStashes[stashIndex].items;

    // Each item holds the value of what league it is in rather than the stash tab for quick reference.
    // Check to see if the stash has items in it and if it does check to make sure that the league setting on the first item
    // is set to the ignoreLeagues array.
    if (items.length > 0 && !ignoreLeagues.includes(items[0].league)) {
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
    } else {
      logger.silly(`Dropped stash tab because of league filter.`);
    }
  }

  return publicStashes;
};

module.exports = stashParser;
