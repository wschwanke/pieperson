/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLSpinnerElement> {
  color: string;
  text: string;
  role: string;
}

const Spinner: React.FunctionComponent<Props> = ({ text }) => {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only">{text}</span>
    </div>
  );
};

export { Spinner };
