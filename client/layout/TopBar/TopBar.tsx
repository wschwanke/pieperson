/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { TopBarUser } from './TopBarUser';

const TopBar: React.FunctionComponent = ({}) => {
  return (
    <header className="TopBar navbar">
      <div className="container d-flex justify-content-end">
        <TopBarUser />
      </div>
    </header>
  );
};

export { TopBar };
