/**
 * External dependencies
 */
import { Db, MongoClient } from 'mongodb';
import { logger } from '../logger';

class MongoDB {
  db: Db;

  async connect() {
    try {
      logger.info('Connecting to the database.')
      const client = await MongoClient.connect(process.env.MONGODB_URI as string);
      logger.info('Connected to the database successfully.');
      this.db = client.db('pieperson');
    } catch (err) {
      logger.error(`Error connecting to MongoDB: ${err}`);
    }
  }

  async disconnect(client: MongoClient) {
    try {
      logger.info('Disconnecting from the database.');
      await client.close();
      logger.info('Disconnected from the database.');
    } catch (err) {
      logger.error(`Error connecting to MongoDB: ${err}`);
    }
  }

  getDb() {
    return this.db;
  }

}

const mongo = new MongoDB();

export { mongo };
