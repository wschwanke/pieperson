import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({currentStyleClasses, to = '', text = 'SetText'}) => {
  return (
    <li className="nav-item">
      <Link className={currentStyleClasses} to={to}>{text}</Link>
    </li>
  );
};

export default NavLink;
