// import itemController from '../../controllers';
import * as stashController from '../../controllers/stashController';
import { logger } from '../logger';

const parseStashes = (publicStashes: any[]) => {
  // const ignoreLeagues = ['Standard', 'Hardcore'];
  const ignoreLeagues = ['Hardcore'];

  // Loop through all stash tabs
  for (const publicStash of publicStashes) {
    const { accountName, lastCharacterName, id, stash, stashType, items } = publicStash;
    const isPublic = publicStash.public;

    // Each item holds the value of what league it is in rather than the stash tab for quick reference.
    // Check to see if the stash has items in it and if it does check to make sure that the league setting on the first item
    // is set to the ignoreLeagues array.
    if (items.length > 0 && !ignoreLeagues.includes(items[0].league)) {
      // Search the database to see if the stashId already exists.
      stashController.findStash(id)
        .then((playerStash: any) => {
          // If stash === null add the new stash into the db
          if (playerStash === null) {
            return stashController.addStash(accountName, lastCharacterName, id, stash, stashType, isPublic, items)
              .then((addedStash: any) => {
                return addedStash;
              }, (err: Error) => {
                logger.error(`parseStashes - stashController.addStash(): ${err}`);
                return err;
              });
          }
          // Update the old stash tab with the new data
          return stashController.updateStash(accountName, lastCharacterName, id, stash, stashType, isPublic, items)
            .then((updatedStash: any) => {
                return updatedStash;
              }, (err: Error) => {
                logger.error(`parseStashes - stashController.addStash(): ${err}`);
                return err;
              });
        }, (err: Error) => {
          logger.error(`parseStashes - stashController.findStash(): ${err}`);
          return err;
        });
    } else {
      logger.silly(`Dropped stash tab because of league filter.`);
    }
  }

  return publicStashes;
};

export default parseStashes;
