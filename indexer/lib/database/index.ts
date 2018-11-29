/**
 * External dependencies
 */
import { Db, MongoClient } from 'mongodb';
import { logger } from '../logger';

class MongoDB {
  db: Db;

  async connect() {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI as string);
      logger.info('Connected to MongoDB successfully.');
      this.db = client.db('pieperson');
      return client;
    } catch (err) {
      logger.error(`Error connecting to MongoDB: ${err}`);
      return err;
    }
  }

  getDb() {
    return this.db;
  }

  async disconnect(client: MongoClient) {
    try {
      await client.close();
      logger.info('Disconnected from database.');
    } catch (err) {
      logger.error(`Error connecting to MongoDB: ${err}`);
    }
  }
}

const mongo = new MongoDB();

export default mongo;
