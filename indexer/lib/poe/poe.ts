/**
 * External dependencies
 */
import { forEach, get } from 'lodash';

/**
 * Internal dependencies
 */
import { nextChangeIdController } from '@Controllers/next-change-id';
import { stashController } from '@Controllers/stash';
import { api } from '@Lib/api';
import { logger } from '@Lib/logger';
import { PathOfExile } from '@Types';

/**
 * Handles calling the fetch for all the stash tabs and then handles the call to parse the fetched data
 * @async
 */
const getStashTabsLoop = async (nextChangeId: string) => {
  try {
    const stashTabsResponse: any = await api.get(`http://api.pathofexile.com/public-stash-tabs?id=${nextChangeId}`);

    const stashes = stashTabsResponse.stashes;

    const nextId = stashTabsResponse.next_change_id;
    logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${nextId}`);
    await parseStashes(stashes);
    setTimeout(() => {
      getStashTabsLoop(nextId);
    }, 10000);
  } catch (err) {
    // getStashTabs Error
    logger.error(err);
    if (err.response.status === 429) {
      const retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2], 10) * 1000;
      logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`);
      setTimeout(getStashTabsLoop, retryTimer);
    }
  }
};

/**
 * Fetches the next change ID from
 * @async
 * @returns {Promise}
 */
const getNextChangeId = async (): Promise<string> => {
  let nextChangeId: string = '';
  let shouldAddToDb: boolean = false;

  // First try and get the next change id from the database
  const nextChangeIdFromDb = await nextChangeIdController.find();
  nextChangeId = get(nextChangeIdFromDb, 'currentNextChangeId');

  // If the database fails to return an id then pull it from POE Ninja
  if (typeof nextChangeId === undefined || !nextChangeId) {
    // Fetches the next change id from POE Ninja
    const poeNinjaResponse = await api.get('https://poe.ninja/api/data/getstats');

    nextChangeId = get(poeNinjaResponse, 'next_change_id');
    shouldAddToDb = true;
  }

  // If nextChangeId isn't a string there is something wrong
  if (typeof nextChangeId !== 'string') {
    throw new Error('Unable to find a usable next change id');
  }

  // Check whether the ID should be added
  if (shouldAddToDb) {
    nextChangeIdController.insert(nextChangeId);
  }

  return nextChangeId;
};

const parseStashes = (publicStashes: PathOfExile.PublicStash[]) => {
  const currentLeague = 'Legion';

  // Loop through all stash tabs
  forEach(publicStashes, (stash) => {
    // we do nothing for now
  });

  return publicStashes;
};

const poe = {
  getNextChangeId,
  getStashTabsLoop,
};

export { poe };
