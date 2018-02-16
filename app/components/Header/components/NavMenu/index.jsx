import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light col-sm-10">
      <div className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        {/*<img src="dist/images/unicorn-gold.png" alt="Golden Unicorn Navigation Bar Toggle" />*/}=
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-home-text">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
