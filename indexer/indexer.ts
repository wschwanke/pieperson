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
    poe.getStashTabsLoop(nextChangeId, 2000);
  } catch (err) {
    logger.error(`${err}`);
  }
};

// Start the indexer
main();

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception: ', error.message);
  logger.error(error.stack!);
  database.disconnect();
  process.exit(1);
});

// process.on('SIGTERM', () => {
//   logger.info('Indexer is shutting down.');
//   database.disconnect();
// });
