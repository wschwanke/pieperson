/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
interface Props extends React.HTMLProps<HTMLH5Element> {
  title: string;
}

const ModalHeader: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
      {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button> */}
      {children}
    </div>
  );
};

export { ModalHeader };
