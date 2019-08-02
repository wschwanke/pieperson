/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const ModalFooter: React.FunctionComponent = ({ children }) => {
  return (
    <div className="modal-footer">
      {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
      {/* <button type="button" className="btn btn-primary">Save changes</button> */}
      {/* Can I replace both buttons with children or do I have to call them? */}
      {children}
    </div>
  );
};

export { ModalFooter };
