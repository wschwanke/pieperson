import React, { Component } from 'react';

// Import layouts
import Body from '../../components/Body';
import DockMenu from '../../components/DockMenu';

class ExampleSceneName extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <DockMenu />
        <Body>
          Test
        </Body>
      </div>
    );
  }
}

export default ExampleSceneName;
