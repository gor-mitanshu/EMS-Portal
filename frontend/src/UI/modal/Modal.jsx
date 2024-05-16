import React from 'react'
import { Modal as ReactModal } from "react-bootstrap";

const Modal = ({ show, handleCloseModal, title, children }) => {
     return (
          <ReactModal show={show} onHide={handleCloseModal}>
               <ReactModal.Header className='mx-2' closeButton>
                    <ReactModal.Title> {title}</ReactModal.Title>
               </ReactModal.Header>
               <ReactModal.Body className='p-4'>
                    {children}
               </ReactModal.Body>
          </ReactModal>
     )
}

export default Modal