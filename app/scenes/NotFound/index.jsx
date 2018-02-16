import React from 'react';

// Import layouts
import Header from '../../components/Header';
import Body from '../../components/Body';
import Footer from '../../components/Footer';

const NotFound = () => (
  <div className="scene-wrap">
    <Header />
    <Body sidebar={false} title="404: Not Found">
      <div className="row">
        Test
      </div>
    </Body>
    <Footer />
  </div>
);

export default NotFound;
