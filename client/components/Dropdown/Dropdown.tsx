/**
 * External dependencies
 */
import classNames from 'classnames';
import React from "react";

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  items: number;
  item: string;
}

const Dropdown: React.FunctionComponent<Props> = ({ text, items, item }) => {
  return (
    <div>
      <button type="button">{text}</button>
      {/* How would you go about not harcoding the amount of items in list? */}
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">
          {item}
        </a>
      </div>
    </div>
  );
};

export { Dropdown };
