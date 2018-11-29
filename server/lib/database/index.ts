const mongodb = require('mongodb').MongoClient;
const logger = require('../logger');

let mongo = {};
let _db;

// Use connect method to connect to the server
mongo.connect = () => {
  return mongodb.connect(process.env.MONGODB_URI)
  .then((client) => {
    logger.info('Connected to MongoDB successfully.')
    _db = client.db('poeindexer');
    return client;
  })
  .catch((err) => {
    logger.error(`Error connecting to MongoDB: ${err}`);
    return err;
  });
};

mongo.getDB = () => {
  return _db;
}

mongo.disconnect = (client) => {
  client.close();
};

module.exports = mongo;
