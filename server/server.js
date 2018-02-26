// Setup the ENV variables for local development. Remove this is production.
const dotenv = require('dotenv').config({ path: 'server/env/.env' });

if (dotenv.error) {
  throw dotenv.error;
}

const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./router/router.js');
const morgan = require('morgan');

// Use express
const app = express();

app.disable('x-powered-by');

app.use(morgan('tiny'));

// Use body-parser for parsing JSON and URLencoded body data
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: false,
  },
}));

// Serve the static client React files
app.use('/dist', express.static(path.join(__dirname, '/public/dist'), { fallthrough: false }));

app.use('/', router);

module.exports = app;
