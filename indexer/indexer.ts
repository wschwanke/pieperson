/**
 * External dependencies
 */
import { config } from 'dotenv';

// Initialize our environment variables with dotenv
config({ path: 'indexer/env/.env' });

/**
 * Internal dependencies
 */
import { database } from '@Lib/database';
import { logger } from '@Lib/logger';
import { poe } from '@Lib/poe';

/**
 * Main function that initially connects to the database and
 * then boots up the indexer loop.
 */
const main = async () => {
  let nextChangeId = '';

  try {
    await database.connect();
    nextChangeId = await poe.getNextChangeId();
    poe.getStashTabsLoop(nextChangeId);
  } catch (err) {
    logger.error(`${err}`);
  }
};

// Start the indexer
main();

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
});

// process.on('SIGTERM', () => {
//   // Disconnect from the database when the application shutsdown
//   database.disconnect();
// });
