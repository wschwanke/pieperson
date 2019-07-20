/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { nextChangeIdController } from '@Controllers/next-change-id';
import { api } from '@Lib/api';
import { logger } from '@Lib/logger';

/**
 * Fetches stash tab data from the Path of Exile public API.
 * @async
 * @return {Promise} The stashes from the API
 */
const getStashTabs = async (nextChangeId: string) => {
  const stashes = api.get(`http://api.pathofexile.com/public-stash-tabs?id=${nextChangeId}`);

};

/**
 * Handles calling the fetch for all the stash tabs and then handles the call to parse the fetched data
 * @async
 */
getStashTabsLoop = async () => {
  try {
    const poeStashTabResponse = await this.getStashTabs();
    const poeStashTabResponseJSON = await poeStashTabResponse.json();
    const stashes = poeStashTabResponseJSON.stashes;

    this.nextId = poeStashTabResponseJSON.next_change_id;
    logger.silly(`Fetched ${stashes.length} stash tabs. Next ID is ${this.nextId}`);
    await parseStashes(stashes);
    setTimeout(this.getStashTabsLoop, 10000);
  } catch (err) {
    // getStashTabs Error
    logger.error(err);
    if (err.response.status === 429) {
      const retryTimer = parseInt(err.response.headers['x-rate-limit-ip'].split(':')[2], 10) * 1000;
      logger.error(`Being rate limited. Trying again in ${retryTimer}ms.`);
      setTimeout(this.getStashTabsLoop, retryTimer);
    }
  }
}

/**
 * Fetches the next change ID from
 * @async
 * @returns {Promise}
 */
const getNextChangeId = async (): Promise<string> => {
  let nextChangeId: string = '';
  let shouldAddToDb: boolean = false;

  // First try and get the next change id from the database
  nextChangeId = await nextChangeIdController.find();

  // If the database fails to return an id then pull it from POE Ninja
  if (nextChangeId === null) {
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

const poe = {
  getNextChangeId,
};

export { poe };
