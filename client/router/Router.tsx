import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

// Import the route components
import Homepage from 'scenes/Homepage';

function Router({ store }) {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    // </Provider>
  );
}

export default hot(module)(Router);