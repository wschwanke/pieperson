/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { PageHeading } from '@Layout/Base/PageHeading';
import { TopBar } from '@Layout/TopBar';

const Main: React.FunctionComponent = ({ children }) => {
  return (
    <div className="Main main-content flex-fill d-flex flex-column max-w-full">
      <TopBar />
      <div className="d-flex flex-fill max-w-full">
        <div className="flex-fill px-lg-2 mw-100">
          <div className="container py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Main };
