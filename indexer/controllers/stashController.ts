// import { logger } from '../lib/logger';
import mongo from '../lib/database';

/*
  addStash( stash Object )
*/
const addStash = (
  accountName: string,
  lastCharacterName: string,
  stashId: number,
  stashName: string,
  stashType: string,
  isPublic: boolean,
  items: any[],
) => {
  const Stash = mongo.getDb().collection('stashes');

  return Stash.insertOne({ accountName, lastCharacterName, stashId, stashName, stashType, isPublic, items })
  .then((stash: any) => {
    return stash;
  }, (err: Error) => {
    throw err;
  });
};

const updateStash = (
  accountName: string,
  lastCharacterName: string,
  stashId: number,
  stashName: string,
  stashType: string,
  isPublic: boolean,
  items: any[],
) => {
  const Stash = mongo.getDb().collection('stashes');

  return Stash.updateOne({ stashId }, { $set: { accountName, lastCharacterName, stashName, stashType, isPublic, items } })
  .then((stash: any) => {
    return stash;
  }, (err: Error) => {
    throw err;
  });
};

const findStash = (stashId: number) => {
  const Stash = mongo.getDb().collection('stashes');

  return Stash.find({stashId}, { limit: 1 }).toArray()
  .then((stash: any) => {
    if (stash.length > 0) {
      return stash[0];
    }
    return null;
  }, (err: Error) => {
    throw err;
  });
};

export { addStash, updateStash, findStash };
