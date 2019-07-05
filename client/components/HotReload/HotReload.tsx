/**
 * External dependencies
 */
import * as React from 'react';
import { hot } from 'react-hot-loader';
// Used for debugging of react hot loader
// import { hot, setConfig } from 'react-hot-loader';
// setConfig({ logLevel: 'debug' });

/**
 * Internal dependencies
 */
import { Router } from '../../router';

const HotReloadBase = () => (
  <Router />
);

const HotReload = hot(module)(HotReloadBase);
export { HotReload };
