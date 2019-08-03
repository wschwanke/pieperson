/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */


const DropdownMenu: React.FunctionComponent = ({ children }) => {
  return (
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">{children}</div>
  );
};

export { DropdownMenu };
