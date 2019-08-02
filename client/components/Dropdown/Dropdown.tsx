/**
 * External dependencies
 */
import classNames from 'classnames';
import React from "react";

/**
 * Internal dependencies
 */


const Dropdown: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="dropdown">{children}</div>
  );
};

export { Dropdown };
