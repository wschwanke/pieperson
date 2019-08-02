/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  placeholder: string;
  type: string;
  hint: string;
}

const Input: React.FunctionComponent = ({ type, placeholder, label, hint }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">{hint}</span>
      </div>
      <input type={type} className="form-control" placeholder={placeholder} aria-label={label} aria-describedby="basic-addon1" />
    </div>
  );
};

export { Input };
