/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const TextInput: React.FunctionComponent<Props> = ({ className, name, label, ...rest }) => {
  const classes = classNames('form-control', className);

  return (
    <>
      {label && label.trim() ? <label className="form-label" htmlFor={name}>{label}</label> : null}
      <input {...rest} name={name} className={classes}  />
    </>
  );
};

export { TextInput };
