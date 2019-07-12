/**
 * Internal dependencies
 */
import { database } from '@Lib/database';

const stash = database.createCollection('stash', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
    },
  },
});

export { stash };
