const axios = require('axios');
const logger = require('../lib/logger');

// Require Mongoose and pass it the connection information
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error(`MongoDB Error: ${err}`)
});

db.once('open', () => {
  logger.info('Connected to database.');
});

db.on('close', () => {
  logger.info('Connection to database closed.');
})

module.exports = db;
