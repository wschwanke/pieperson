import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import Router from './Router';

ReactDOM.render(
  <Router />,
  document.getElementById('root'),
);

// import rootReducer from './reducers';

// const store = createStore(rootReducer, {}, applyMiddleware(
//   thunk,
//   logger,
// ));

// ReactDOM.render(
//   <Router store={store} />,
//   document.getElementById('root'),
// );
