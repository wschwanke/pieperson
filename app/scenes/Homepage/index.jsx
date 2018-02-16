import React from 'react';

// Import layouts
import Header from '../../components/Header';
import Body from '../../components/Body';
import Footer from '../../components/Footer';

// Import components

const Homepage = () => (
  <div className="scene-wrap">
    <Header />
    <Body sidebar={false} title="Homepage" noHeader>
      <h2>Test2</h2>
    </Body>
    <Footer />
  </div>
);

export default Homepage;
