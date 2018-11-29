/**
 * External dependencies
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Store } from 'redux';
import 'simplebar';
import 'whatwg-fetch';

/**
 * Internal dependencies
 */
import { HotReload } from 'components/hot-reload';
// import { createReduxStore, IApplicationState } from 'state';

// const store: Store<IApplicationState> = createReduxStore();

ReactDOM.render(
  <HotReload />,
  document.getElementById('root'),
);
