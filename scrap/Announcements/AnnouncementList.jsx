import React, { useState } from "react";
import AddAnnouncementForm from "./AnnouncementForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AnnouncementList = ({
  announcements,
  error,
  setError,
  handleInputChange,
  index,
  id,
  handleDelete,
  handleEdit,
  handleCancel,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [announcement, setAnnouncement] = useState(announcements);

  const handleEditClick = () => {
    setAnnouncement({ announcement: announcements });
    setError({ announcement: "" });
    setIsEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setAnnouncement(announcements);
    setError("");
  };
  return (
    <>
      {isEdit ? (
        <AddAnnouncementForm
          announcement={announcement}
          error={error}
          handleInputChange={handleInputChange}
          handleSubmit={handleSave}
          handleCancel={handleCancelEdit}
          isEdit={true}
        />
      ) : (
        <div>
          <strong>{announcements}</strong>
        </div>
      )}
      <div className="d-flex justify-content-end">
        {!isEdit && (
          <>
            <button className="btn btn-link" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} color="blue" />
            </button>
            <button className="btn btn-link" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} color="red" />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AnnouncementList;
