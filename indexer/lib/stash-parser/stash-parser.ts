/**
 * External dependencies
 */
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */
import { stashController } from '@Controllers/stash';
import { logger } from '@Lib/logger';
import { PathOfExile } from '@Types';

const parseStashes = (publicStashes: PathOfExile.PublicStash[]) => {
  const currentLeague = 'Legion';

  // Loop through all stash tabs
  forEach(publicStashes, (stash) => {
    // we do nothing for now
  });

  return publicStashes;
};

export { parseStashes };
