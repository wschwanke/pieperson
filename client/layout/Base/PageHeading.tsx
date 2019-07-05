/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const PageHeading: React.FunctionComponent = ({ children }) => {
  return (
    <div className="page-title-box">
      <h1 className="page-title">{children}</h1>
    </div>
  );
};

export { PageHeading };
