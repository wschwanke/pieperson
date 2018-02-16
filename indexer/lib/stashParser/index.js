const accountController = require('../../controllers').accountController;

const stashParser = {};

/*
  parseStashes( stashes [Object] )
*/
stashParser.parseStashes = (stashes) => {
  let publicStashArray = stashParser.findPublicStashes(stashes);
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
  for (let index = 0; index < stashes.length; index++) {
    accountController.addAccount(stashes[index].accountName, stashes[index].lastCharacterName)
    .then((account) => {
      return stashController.addStash()
    })
    .then((stash) => {
      
    })
    .catch((err) => {

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
