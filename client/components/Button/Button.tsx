/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLButtonElement> {
  text: string;
}

const Button: React.FunctionComponent<Props> = ({ text }) => {
  return (
    <button type="button">{text}</button>
  );
};

export { Button };
