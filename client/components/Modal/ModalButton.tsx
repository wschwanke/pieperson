/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  toggle: string;
  target: string;
  dismiss: string;
}

const ModalButton: React.FunctionComponent<Props> = ({ text, toggle, target, dismiss }) => {
  return (
    <button type="button" className="btn btn-primary" data-toggle={toggle} data-dismiss={dismiss} data-target={target}>
      {text}
    </button>
  );
};

export { ModalButton };
