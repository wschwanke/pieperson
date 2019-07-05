/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */

interface Props {
  isRow?: boolean;
}

const FormGroup: React.FunctionComponent<Props> = ({ children, isRow }) => {
  const classes = classNames('form-group', {
    row: isRow,
  });

  return (
    <div className={classes}>{children}</div>
  );
};

export { FormGroup };
