/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const Modal: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        {children}
      </div>
    </div>
  );
};

export { Modal };
