/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { SidebarBrand } from './SidebarBrand';
import { SidebarHeading } from './SidebarHeading';
import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuItem } from './SidebarMenuItem';

const Sidebar: React.FunctionComponent = ({}) => {
  return (
    <aside className="Sidebar navbar navbar-side navbar-dark navbar-expand-md">
      <SidebarBrand text="Keto Tracker"/>
      <SidebarHeading>Main Menu</SidebarHeading>
      <SidebarMenu>
        <SidebarMenuItem icon="fas fa-book" href="/">Dashboard</SidebarMenuItem>
      </SidebarMenu>
      <SidebarHeading>Diary</SidebarHeading>
      <SidebarMenu>
        <SidebarMenuItem icon="fas fa-book" href="/diary/add">Add Entry</SidebarMenuItem>
        <SidebarMenuItem icon="fas fa-book" href="/diary">View</SidebarMenuItem>
      </SidebarMenu>
    </aside>
  );
};

export { Sidebar };
