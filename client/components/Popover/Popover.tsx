/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLButtonElement> {
  placement: string;
  text: string;
  type: string;
}

const Popover: React.FunctionComponent<Props> = ({ text }) => {
  return (
    <button type="button" className="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
      {text}
    </button>
  );
};

export { Popover };
