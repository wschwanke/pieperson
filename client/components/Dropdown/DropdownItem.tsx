/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLAnchorElement> {
  text: string;
  link: string;
}

const DropdownMenu: React.FunctionComponent<Props> = ({ text, link }) => {
  return (
    <a className="dropdown-item" href={link}>{text}</a>
  );
};

export { DropdownMenu };
