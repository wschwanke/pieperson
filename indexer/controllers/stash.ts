/**
 * External dependencies
 */
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */
import { database } from '@Lib/database';
import { logger } from '@Lib/logger';
import { PathOfExile } from '@Types';

const bulkUpdate = async (stashes: PathOfExile.PublicStash[]) => {
  try {
    const BulkStash = database.getDb().collection('stash').initializeUnorderedBulkOp();

    forEach(stashes, (stash) => {
      BulkStash.find({ stashId: stash.stashId }).upsert().updateOne(stash);
    });
    const results = await BulkStash.execute();
  } catch (error) {
    logger.error('Failed to upcert stash tab into collection.');
    logger.error(error);
  }
};

const stashController = {
  bulkUpdate,
};

export { stashController };
