const logger = require('../lib/logger');
const mongo = require('../lib/database');

const stashController = {};

/*
  addStash( stash Object )
*/
stashController.addStash = (accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items) => {
  let Stash = mongo.getDB().collection('stashes');

  return Stash.insertOne({ accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items })
  .then((stash) => {
    return stash;
  }, (err) => {
    throw err;
  });
};

stashController.updateStash = (accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items) => {
  let Stash = mongo.getDB().collection('stashes');

  return Stash.updateOne({ stashId }, { $set: { accountName, lastCharacterName, stashName, stashType, isPublic, items } })
  .then((stash) => {
    return stash;
  }, (err) => {
    throw err;
  })
};

stashController.findStash = (stashId) => {
  let Stash = mongo.getDB().collection('stashes');

  return Stash.find({stashId}, { limit: 1 }).toArray()
  .then((stash) => {
    if (stash.length > 0) {
      return stash[0]
    }
    return null;
  }, (err) => {
    throw err;
  });
};

module.exports = stashController;
