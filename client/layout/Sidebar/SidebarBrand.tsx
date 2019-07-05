/**
 * External dependencies
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Internal dependencies
 */

interface Props {
  alt?: string;
  href?: string;
  src?: string;
  text?: string;
}

const SidebarBrand: React.FunctionComponent<Props> = ({ alt, href = '/', src, text }) => {
  const imageBranding = (<img src={src} className="navbar-brand-logo" alt={alt} />);
  const textBranding = (<div className="navbar-brand-logo">{text}</div>);
  return (
    <div className="p-3">
      <NavLink className="SidebarBrand navbar-brand text-inherit" to={href}>
        {typeof src !== 'undefined' ? imageBranding : textBranding }
      </NavLink>
    </div>
  );
};

export { SidebarBrand };
