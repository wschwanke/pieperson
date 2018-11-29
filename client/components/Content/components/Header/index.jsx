import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="Header">
      </header>
    );
  }
}

export default withRouter(Header);
