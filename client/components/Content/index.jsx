import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';

class Content extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <Header />
        <div className="Content">
          {this.props.children}
        </div>
        <Footer />
      </main>
    );
  }
}

export default Content;
