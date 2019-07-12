/**
 * External dependencies
 */
import { Db, MongoClient } from 'mongodb';
import { logger } from '../logger';

const { MONGODB_URI } = process.env;

class Database {
  db: Db;

  async connect(): Promise<MongoClient | any> {
    logger.info('Connecting to the database.');
    // Connect to the mongo database
    const client = await MongoClient.connect(MONGODB_URI as string, {
      useNewUrlParser: true,
    });
    logger.info('Connected to the database successfully.');
    // Pass the pieperson collection to this.db
    this.db = client.db('pieperson');
  }

  async disconnect(client: MongoClient) {
    logger.info('Disconnecting from the database.');
    await client.close();
    logger.info('Disconnected from the database.');
  }

  getDb() {
    return this.db;
  }

}

const database = new Database();

export { database };
