import React from 'react';

// Import layouts
import Content from '../../components/Content';
import DockMenu from '../../components/DockMenu';

const NotFound = () => (
  <div>
    <DockMenu />
    <Content>
      404: Not Found
    </Content>
  </div>
);

export default NotFound;
