/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const CardHeader: React.FunctionComponent = ({ children }) => {
  return (
    <div className="card-header">{children}</div>
  );
};

export { CardHeader };
