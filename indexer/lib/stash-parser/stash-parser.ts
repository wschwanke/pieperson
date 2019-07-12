/**
 * External dependencies
 */
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */
import { stashController } from '@Controllers/stash-controller';
import { logger } from '@Lib/logger';

const parseStashes = (publicStashes: PublicStash[]) => {
  const currentLeague = 'Legion';

  // Loop through all stash tabs
  forEach(publicStashes, (stash) => {
    console.log(stash);
  });

  return publicStashes;
};

export { parseStashes };
