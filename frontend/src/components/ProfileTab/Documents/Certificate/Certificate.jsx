import React, { useState } from "react";
import CertificateModal from "./CertificateModal";

const Certificate = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Add Certificate
      </button>
      <CertificateModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Certificate;
