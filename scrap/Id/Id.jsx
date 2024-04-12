import React from "react";
import { useState } from "react";
import IdModal from "./IdModal";

const Id = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Add
      </button>
      <IdModal
        show={showModal}
        // handleClose={handleCloseModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Id;
