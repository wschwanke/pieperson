// import { logger } from '../lib/logger';
import { database } from '@Lib/database';

const upsert = (
  accountName: string,
  lastCharacterName: string,
  stashId: number,
  stashName: string,
  stashType: string,
  isPublic: boolean,
  items: any[],
) => {
  const Stash = database.getDb().collection('stashes');

  return Stash.updateOne({ stashId }, { $set: { accountName, lastCharacterName, stashName, stashType, isPublic, items } })
  .then((stash: any) => {
    return stash;
  }, (err: Error) => {
    throw err;
  });
};

const stashController = {
  upsert,
};

export { stashController };
