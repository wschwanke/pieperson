const winston = require('winston');
const moment = require('moment');
const { join } = require('path');

winston.emitErrs = true;
winston.exitOnError = false;

const logger = new winston.Logger({
  level: 'silly',
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    new winston.transports.File({
      level: 'info',
      filename: join(process.cwd(), `logs/${moment().format('YYYY-MM-DD')}.log`),
      prettyPrint: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false,
      zippedArchive: true
    })
  ]
});

module.exports = logger;
