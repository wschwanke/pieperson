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
 * @param {string} nextChangeId - The currency next change id from path of exile
 * @param {number} timeoutInterval - The interval at which the Path of Exile API is queried
 */
const getStashTabsLoop = async (nextChangeId: string, timeoutInterval: number = 10000) => {
  let nextId = '';

  try {
    const stashTabsResponse: PathOfExile.Response = await api.get(`http://api.pathofexile.com/public-stash-tabs?id=${nextChangeId}`);

    const stashes = stashTabsResponse.stashes;
    nextId = stashTabsResponse.next_change_id;

    logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${nextId}`);
    nextChangeIdController.update(nextId);

    parseStashes(stashes);

    setTimeout(async () => {
      getStashTabsLoop(nextId, timeoutInterval);
    }, timeoutInterval);
  } catch (error) {
    // getStashTabs Error
    logger.error(error);

    const response = get(error, 'response');
    const status = get(error, 'status');

    // If there is a Fetch error then response will be undefined
    if (typeof response !== 'undefined') {
      logger.error(error.response);
    }

    // Same issue here, if a Fetch error occurs status wont be defined
    if (typeof status !== 'undefined' && status === 429) {
      const retryTimer = parseInt(error.response.headers['x-rate-limit-ip'].split(':')[2], 10) * 1000;
      logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`);
      setTimeout(getStashTabsLoop, retryTimer);
    } else {
      setTimeout(async () => {
        getStashTabsLoop(nextId, timeoutInterval);
      }, timeoutInterval);
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
  parseStashes,
};

export { poe };
