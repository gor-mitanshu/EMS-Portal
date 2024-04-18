import React, { useState } from "react";
import AddAnnouncementForm from "./AnnouncementForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AnnouncementList = ({
  announcements,
  error,
  setError,
  handleDelete,
  handleEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [announcement, setAnnouncement] = useState(announcements.content);

  const handleEditClick = () => {
    setAnnouncement(announcements.content);
    setError("");
    setIsEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(announcements.id);
    console.log(announcement);
    handleEdit(announcements.id, announcement);
    setIsEdit(false);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setAnnouncement(announcements.content);
    setError("");
  };

  return (
    <>
      {isEdit ? (
        <AddAnnouncementForm
          announcement={announcement}
          error={error}
          handleInputChange={(e) => setAnnouncement(e.target.value)}
          handleSubmit={handleSave}
          handleCancel={handleCancelEdit}
          isEdit={true}
        />
      ) : (
        <div>
          <strong>{announcements.content}</strong> {/* Render content here */}
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
