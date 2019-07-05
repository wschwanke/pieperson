/**
 * External depdencies
 */
import * as dotenv from 'dotenv';
import { createReadStream } from 'fs';
import 'isomorphic-fetch';
import * as Koa from 'koa';
import * as koaBodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as koaLogger from 'koa-logger';
import * as mount from 'koa-mount';
import * as serveStatic from 'koa-static';
import { join } from 'path';

// Setup the ENV variables for local development. This MUST be called before any internal dependencies
dotenv.config({ path: 'webserver/env/.env' });

/**
 * Internal depdencies
 */
import { logger } from './lib/logger';

const {
  SECRET_KEY_SALT,
  PORT,
} = process.env;

// Use Koa
const server: Koa = new Koa();

// Error handling
server.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    // @ts-ignore
    ctx.app.emit('error', err, ctx);
  }
});

server.use(helmet());

// Body parser
server.use(koaBodyParser());

// Server salt
server.keys = [SECRET_KEY_SALT];

// Koa Logger
server.use(koaLogger());

server.use(mount('/assets', serveStatic(join(process.cwd(), '.build/client/assets/'))));

// Return the body
server.use(async (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream(join(process.cwd(), '.build/client/index.html'));
  return;
});

// Set the port to the ENV variable or use 3000 as default
const port = PORT || 3000;

// create the actual server using our app
server.listen(port, () => {
  logger.info(`Web Server:`);
  logger.info(`Listening on port ${port}`);
  logger.info(`Serving static files from ${join(process.cwd(), '.build/client')}`);
});
