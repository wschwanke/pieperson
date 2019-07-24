/**
 * External dependencies
 */
import { Db } from 'mongodb';

/**
 * Internal dependencies
 */
import { logger } from '@Lib/logger';

const createStashCollection = async (mongo: Db) => {
  try {
    mongo.createCollection('stash', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
        },
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export { createStashCollection };
