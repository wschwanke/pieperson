/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */

interface Props {
  fluid?: boolean;
}

const Container: React.FunctionComponent<Props> = ({ children , fluid }) => {
  const classes = classNames({
    'container': !fluid,
    'container-fluid': fluid,
  });

  return (
    <div className={classes}>{children}</div>
  );
};

export { Container };
