// import { logger } from '../lib/logger';
import { database } from '@Lib/database';
import { PathOfExile } from '@Types';

const Stash = database.getDb().collection('stashes');

const upsert = async (stash: PathOfExile.PublicStash) => {
  const stashId = stash.id;
  return Stash.updateOne({ stashId }, { $set: { ...stash } });
};

const stashController = {
  upsert,
};

export { stashController };
