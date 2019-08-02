/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLMediaElement> {
  src: string;
  alt: string;
  margin: string;
}

const MediaObject: React.FunctionComponent<Props> = ({ src, alt, margin, children }) => {
  return (
    <div className="media">
      <img src={src} className={margin} alt={alt} />
      {children}
    </div>
  );
};

export { MediaObject };
