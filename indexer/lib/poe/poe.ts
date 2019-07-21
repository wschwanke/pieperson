/**
 * External dependencies
 */
import { filter, forEach, get } from 'lodash';

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
 * @param {string} nextChangeId - The currency next change id from path of exile
 * @param {number} interval - The interval at which the Path of Exile API is queried
 */
const getStashTabsLoop = async (nextChangeId: string, interval: number = 10000) => {
  try {
    const stashTabsResponse: any = await api.get(`http://api.pathofexile.com/public-stash-tabs?id=${nextChangeId}`);

    const stashes = stashTabsResponse.stashes;
    const nextId = stashTabsResponse.next_change_id;

    logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${nextId}`);

    parseStashes(stashes);

    setTimeout(() => {
      getStashTabsLoop(nextId);
    }, interval);
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

const parseStashes = async (publicStashes: PathOfExile.PublicStashOriginal[]) => {
  const currentLeague = 'Legion';
  const filteredStashes: PathOfExile.PublicStash[] = [];

  // Loop through all stash tabs
  forEach(publicStashes, async (stash) => {
    if (stash.league === currentLeague) {
      const { id, ...rest } = stash;

      filteredStashes.push({
        stashId: id,
        ...rest,
      });
    }
  });

  try {
    stashController.bulkUpdate(filteredStashes);
  } catch (error) {
    logger.error(error);
  }
};

const poe = {
  getNextChangeId,
  getStashTabsLoop,
};

export { poe };
