/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLMediaElement> {
  text: string;
  heading: string;
  margin: string;
}

const MediaObjectBody: React.FunctionComponent<Props> = ({ text, heading, margin }) => {
  return (
    <div className="media-body">
      <h5 className={margin}>{heading}</h5>
      {text}
    </div>
  );
};

export { MediaObjectBody };
