import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavMenu from './components/NavMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isNavHidden: false
    };
  }

  render() {
    return (
      <header className="header-main banner mb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="bumper" />
            <NavMenu />
            <div className="bumper" />
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
