import * as winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.colorize(),
  ),
  level: 'silly',
  transports: [
    new winston.transports.Console(),
  ],
});

export { logger };
