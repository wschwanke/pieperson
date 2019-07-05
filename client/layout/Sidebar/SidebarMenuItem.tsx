/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { isArray } from 'util';

/**
 * Internal dependencies
 */

interface Props {
  href: string;
  icon?: string;
}

const SidebarMenuItem: React.FunctionComponent<Props> = ({ children, href, icon }) => {
  let title: string | React.ReactNode = children;

  return (
    <li className="SidebarMenuItem nav-item">
      <NavLink exact to={href} activeClassName="active" className="nav-link">
        {typeof icon !== 'undefined' ? <i className={`icon ${icon}`} /> : null}
        <span className="nav-link-title">{children}</span>
      </NavLink>
    </li>
  );
};

export { SidebarMenuItem };
