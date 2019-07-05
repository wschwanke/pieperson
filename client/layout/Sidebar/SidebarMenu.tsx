/**
 * External dependencies
 */
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';

/**
 * Internal dependencies
 */

const SidebarMenu: React.FunctionComponent = ({ children }) => {
  return (
    <ul id="menu" className="SidebarMenu navbar-nav mb-md-4">
      {children}
    </ul>
  );
};

export { SidebarMenu };
