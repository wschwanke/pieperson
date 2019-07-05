/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const Card: React.FunctionComponent = ({ children }) => {
  return (
    <div className="card">{children}</div>
  );
};

export { Card };
