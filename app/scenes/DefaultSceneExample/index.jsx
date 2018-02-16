import React, { Component } from 'react';

// Import layouts
import Header from '../../components/Header';
import Body from '../../components/Body';
import Footer from '../../components/Footer';

// Import components

class ExampleSceneName extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="scene-wrap">
        <Header />
        <Body sidebar={false} title="Example Scene">
          <div className="row">
            <div className="col">
              <h2>Example Scene</h2>
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }
}

export default ExampleSceneName;
