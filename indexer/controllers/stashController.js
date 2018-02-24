const logger = require('../lib/logger');
const mongo = require('../lib/database');

const stashController = {};

/*
  addStash( stash Object )
*/
stashController.addStash = (accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items) => {
  let db = mongo.getDB();

  return db.collection('stashes').insertOne({ accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items })
  .then((stash) => {
    return stash;
  }, (err) => {
    return err;
  });
};

stashController.updateStash = (accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items) => {
  let db = mongo.getDB();

  return db.collection('stashes').updateOne({ stashId }, { $set: { accountName, lastCharacterName, stashName, stashType, isPublic, items } })
  .then((stash) => {
    return stash;
  }, (err) => {
    return err;
  })
};

stashController.findStash = (stashId) => {
  let db = mongo.getDB();

  return db.collection('stashes').find({stashId}, { limit: 1 }).toArray()
  .then((stash) => {
    if (stash.length > 0) {
      return stash[0]
    }
    return null;
  }, (err) => {
    return err;
  });
};

module.exports = stashController;
