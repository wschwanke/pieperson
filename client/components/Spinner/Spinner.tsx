/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLSpinnerElement> {
  text: string;
  role: string;
  name: string;
}

const Spinner: React.FunctionComponent<Props> = ({ text, role, name }) => {
  return (
    <div className={name} role={role}>
      <span className={name}>{text}</span>
    </div>
  );
};

export { Spinner };
