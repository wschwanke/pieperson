/**
 * External dependencies
 */
import { Db, MongoClient } from 'mongodb';

/**
 * Internal dependencies
 */
import { createNextChangeIdCollection } from '@Collections/next-change-id';
import { createStashCollection } from '@Collections/stash';
import { logger } from '../logger';

const { MONGODB_URI } = process.env;

class Database {
  db!: Db;
  client!: MongoClient;

  async connect(): Promise<MongoClient | any> {
    logger.info('Connecting to the database.');
    // Connect to the mongo database
    const client = await MongoClient.connect(MONGODB_URI as string, {
      useNewUrlParser: true,
    });
    logger.info('Connected to the database successfully.');
    // Pass the pieperson collection to this.db
    this.db = client.db('pieperson');
    this.client = client;
    this.initializeDb();
  }

  async disconnect() {
    logger.info('Disconnecting from the database.');
    await this.client.close();
    logger.info('Disconnected from the database.');
  }

  async initializeDb() {
    createStashCollection(this.getDb());
    createNextChangeIdCollection(this.getDb());
  }

  getDb() {
    return this.db;
  }
}

const database = new Database();

export { database };
