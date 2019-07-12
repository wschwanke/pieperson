/**
 * External dependencies
 */
import * as winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple(),
  ),
  level: 'silly',
  transports: [
    new winston.transports.Console(),
  ],
});

export { logger };
