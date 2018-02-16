// import React from 'react';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: 'true',
    };
  }

  componentDidMount() {
    // Do a check to see if they are authenticated.
  }

  render() {
    if (this.state.authenticated === 'pending') {
      return null;
    }
    if (this.state.authenticated) {
      return <Route {...this.props.rest} component={this.props.component} />;
    }
    return <Redirect to="/login" from={this.props.path} />;
  }
}

export default PrivateRoute;
