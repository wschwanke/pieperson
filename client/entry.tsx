/**
 * External dependencies
 */
import 'bootstrap';
import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

/**
 * Internal dependencies
 */
import HotReload from '@Components/HotReload';

ReactDOM.render(
  <HotReload />,
  document.getElementById('root'),
);
