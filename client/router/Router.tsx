/**
 * External dependencies
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { SceneDiary, SceneDiaryAdd } from '@Scenes/Diary';
import { SceneHomepage } from '@Scenes/Homepage';
import { SceneNotFound } from '@Scenes/NotFound';

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SceneHomepage} />
        <Route exact path="/diary" component={SceneDiary} />
        <Route exact path="/diary/add" component={SceneDiaryAdd} />
        <Route component={SceneNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export { Router };
