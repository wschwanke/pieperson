const accountController = require('../../controllers').accountController;
const itemController = require('../../controllers').itemController;
const logger = require('../logger');

const stashParser = {};

/*
  parseStashes( stashes [Object] )
*/
stashParser.parseStashes = (stashes) => {
  let publicStashArray = stashParser.findPublicStashes(stashes);

  logger.info(`${publicStashArray.length} public stash tabs out of ${stashes.length}`);
  stashParser.parsePublicStashes(publicStashArray);
};

stashParser.findPublicStashes = (stashes) => {
  let publicStashes = [];

  for (let index = 0; index < stashes.length; index++) {
    if (stashParser.isPublicStashTab(stashes[index])) {
      publicStashes.push(stashes[index]);
    }
  }
  return publicStashes;
}

stashParser.parsePublicStashes = (stashes) => {
  for (let accountIndex = 0; accountIndex < stashes.length; accountIndex++) {
    let accountName = stashes[accountIndex].accountName;
    let lastCharacterName = stashes[accountIndex].lastCharacterName;
    let items = stashes[accountIndex].items;

    accountController.addAccount(accountName, lastCharacterName)
    .then((account) => {
      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        itemController.addItem(items[itemIndex])
        .then((item) => {
          accountController.addItemToAccount(accountName, item._id);
        })
        .catch((err) => {
          logger.error(err);
        });
      }
    })
    .catch((err) => {
      logger.error(err);
    });
  }
};

stashParser.isPublicStashTab = (stashTab) => {
  if (!stashTab.public) {
    return false;
  }
  return true;
};

module.exports = stashParser;
