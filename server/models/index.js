const axios = require('axios');
const logger = require('../lib').logger;

// Require Mongoose and pass it the connection information
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/poeindexer');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  logger.debug('Connected to Database.');
});

module.exports = db;
