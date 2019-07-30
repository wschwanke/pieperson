/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLProgressElement> {
  value: string;
  width: string;
}

const Progress: React.FunctionComponent<Props> = ({ width, value }) => {
  return (
    <div className="progress">
      <div className="progress-bar" style="width: ${width}%" role="progressbar" aria-valuenow="${value}" aria-valuemin="${value}" aria-valuemax="100" />
    </div>
  );
};

export { Progress };
