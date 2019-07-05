/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const SidebarHeading: React.FunctionComponent = ({ children }) => {
  return (
    <h6 className="SidebarHeading navbar-heading">{children}</h6>
  );
};

export { SidebarHeading };
