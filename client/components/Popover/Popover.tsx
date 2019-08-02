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
  color: string;
  content: string;
}

const Popover: React.FunctionComponent<Props> = ({ text, color, content, placement }) => {
  return (
    <button type="button" className={color} data-container="body" data-toggle="popover" data-placement={placement} data-content={content}>
      {text}
    </button>
  );
};

export { Popover };
