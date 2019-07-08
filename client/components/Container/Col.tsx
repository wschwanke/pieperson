/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { isBoolean, isNumber } from 'util';

/**
 * Internal dependencies
 */

interface Props {
  col: string | number | boolean;
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
}

const Col: React.FunctionComponent<Props> = ({ children, col, xs, sm, md, lg, xl }) => {
  const classes = classNames({
    col:  isBoolean(col),
    [`col-${col}`]: typeof col !== 'undefined' && !isBoolean(col) ? (col > 0 && col <= 12) : false,
    [`col-xs-${xs}`]: typeof xs !== 'undefined' ? (xs > 0 && xs <= 12) : false,
    [`col-sm-${sm}`]: typeof sm !== 'undefined' ? (sm > 0 && sm <= 12) : false,
    [`col-md-${md}`]: typeof md !== 'undefined' ? (md > 0 && md <= 12) : false,
    [`col-lg-${lg}`]: typeof lg !== 'undefined' ? (lg > 0 && lg <= 12) : false,
    [`col-xl-${xl}`]: typeof xl !== 'undefined' ? (xl > 0 && xl <= 12) : false,
  });

  return (
    <div className={classes}>{children}</div>
  );
};

export { Col };
