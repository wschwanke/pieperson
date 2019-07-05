/**
 * External dependencies
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { SceneHomepage } from '@Scenes/Homepage';
import { SceneNotFound } from '@Scenes/NotFound';

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SceneHomepage} />
        <Route component={SceneNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export { Router };
