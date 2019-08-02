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
  role: string;
}

const Progress: React.FunctionComponent<Props> = ({ width, value, role }) => {
  return (
    <div className="progress">
      <div className="progress-bar" style={width} role={role} aria-valuenow={value} aria-valuemin={value} aria-valuemax="100" />
    </div>
  );
};

export { Progress };
