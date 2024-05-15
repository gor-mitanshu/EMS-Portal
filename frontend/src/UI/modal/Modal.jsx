import React from 'react'
import { Modal as ReactModal } from "react-bootstrap";

const Modal = ({ show, handleCancel, title, children }) => {
     return (
          <>
               <ReactModal show={ show } onHide={ handleCancel }>
                    <ReactModal.Header closeButton>
                         <ReactModal.Title> { title }</ReactModal.Title>
                    </ReactModal.Header>
                    <ReactModal.Body>
                         { children }
                    </ReactModal.Body>
               </ReactModal>
          </>
     )
}

export default Modal