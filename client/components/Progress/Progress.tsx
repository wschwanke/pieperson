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

const Progress: React.FunctionComponent<Props> = ({  }) => {
  return (
    <div className="progress">
      <div className="progress-bar" style="width: 25%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  );
};

export { Progress };
