/**
 * Internal dependencies
 */
import { database } from '@Lib/database';
import { logger } from '@Lib/logger';
import { PathOfExile } from '@Types';

const updateMany = async (stash: PathOfExile.PublicStash) => {
  try {
    const Stash = database.getDb().collection('stash');
    const { id, ...rest } = stash;

    const updatedStash = await Stash.updateOne({ stashId: id }, { $set: { stashId: id, ...rest } }, { upsert: true });
  } catch (error) {
    logger.error('Failed to upcert stash tab into collection.');
    logger.error(error);
  }
};

const stashController = {
  updateMany,
};

export { stashController };
