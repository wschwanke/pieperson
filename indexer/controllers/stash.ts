// import { logger } from '../lib/logger';
import { database } from '@Lib/database';

const Stash = database.getDb().collection('stashes');

const upsert = async (stash: PathOfExile.PublicStash) => {
  const stashId = stash.id;
  return Stash.updateOne({ stashId }, { $set: { ...stash } });
};

const stashController = {
  upsert,
};

export { stashController };
