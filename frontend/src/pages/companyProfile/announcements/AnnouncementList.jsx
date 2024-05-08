import React, { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true)
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setAnnouncement(announcements.content);
    setError("");
  };

  return (
    <>
      {isEdit ? (
        // <AddAnnouncementForm
        //   announcement={announcement}
        //   error={error}
        //   handleInputChange={(e) => setAnnouncement(e.target.value)}
        //   handleSubmit={handleSave}
        //   handleCancel={handleCancelEdit}
        //   isEdit={true}
        // />
        <form action="" onSubmit={handleSave}>
          <div className="text-start">
            <div
              className={`form-input-wrapper ${error ? "error-form-input" : ""
                }`}
            >
              <i className="bi bi-chat-left-quote-fill prefix-icon"></i>
              <textarea
                className="form-input"
                placeholder="Add Announcement"
                name="announcement"
                rows="1"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
              />
            </div>
            <div className="input-error">{error}</div>
          </div>
          <div >
            <button className="btn btn-danger me-3" onClick={handleCancelEdit}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
            >
              {isSubmitting ? "Posting..." : "Post Announcement"}
            </button>
          </div>
        </form>
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
