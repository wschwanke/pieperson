const winston = require('winston');
require('winston-daily-rotate-file');
const { join } = require('path');

winston.emitErrs = true;
winston.exitOnError = false;

const logger = new winston.Logger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      name: 'log-file',
      filename: join(process.cwd(), 'logs/-indexer.log'),
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      prettyPrint: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    })
  ]
});

module.exports = logger;
