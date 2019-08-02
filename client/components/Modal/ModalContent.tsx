/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const ModalContent: React.FunctionComponent = ({ children }) => {
  return (
    <div className="modal-content">{children}</div>
  );
};

export { ModalContent };
