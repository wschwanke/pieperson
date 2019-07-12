/**
 * Internal dependencies
 */
import { database } from '@Lib/database';
import { logger } from '@Lib/logger';
import { Db } from 'mongodb';

const createNextChangeIdCollection = async (mongo: Db) => {
  try {
    mongo.createCollection('nextChangeId', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['currentNextChangeId'],
          properties: {
            currentNextChangeId: {
              bsonType: 'string',
              description: 'The next change id to be used when the indexer spins up again.',
            },
          },
        },
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export { createNextChangeIdCollection };
