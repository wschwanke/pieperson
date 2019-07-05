/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const Row: React.FunctionComponent = ({ children }) => {
  return (
    <div className="row">{children}</div>
  );
};

export { Row };
