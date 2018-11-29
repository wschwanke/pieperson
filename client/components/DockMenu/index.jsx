import React, { Component } from 'react';
import axios from 'axios';

class DockMenu extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <aside className="DockMenu">
        <nav className="DockMenu-nav">
          <ul>
            <li>
              <a href="#">Currency Graphs</a>
            </li>
            <li>
              <a href="#">Lab Enchants</a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default DockMenu;
