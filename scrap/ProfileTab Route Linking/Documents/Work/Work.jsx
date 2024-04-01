import React, { useState } from "react";
import WorkModal from "./WorkModal";

const Work = () => {
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
        Add Achievements
      </button>
      <WorkModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Work;
