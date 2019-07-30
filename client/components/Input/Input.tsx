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
}

const Input: React.FunctionComponent = ({ children }) => {
  return (
    // <div className="input-group mb-3">
    //   <div className="input-group-prepend">
    //     <span className="input-group-text" id="basic-addon1">{label}</span>
    //   </div>
    //   <input {type} className="form-control" {placeholder} aria-label="Username" aria-describedby="basic-addon1">
    // </div>
  );
};

export { Input };
