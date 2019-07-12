/**
 * Internal dependencies
 */
import { database } from '@Lib/database';

const mongo = database.getDb();

mongo.createCollection('nextId', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: 'currentNextChangeId',
      properties: {
        currentNextChangeId: {
          bsonType: 'string',
          description: 'The next change id to be used when the indexer spins up again.',
        },
      },
    },
  },
});
