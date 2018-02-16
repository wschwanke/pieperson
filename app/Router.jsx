import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './components/PrivateRoute';

// Import the route components
import Homepage from './scenes/Homepage';
import NotFound from './scenes/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
