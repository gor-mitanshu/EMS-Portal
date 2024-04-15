import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faMessage,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const AddAnnouncementForm = ({ onAdd, initialAnnouncement }) => {
  const [announcement, setAnnouncement] = useState(initialAnnouncement || "");
  const [isMaxLengthError, setIsMaxLengthError] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAnnouncement(value);
    setIsMaxLengthError(value.length > 100);
    setIsEmptyError(value.trim() === "");
  };

  const handleAddAnnouncement = async () => {
    if (announcement === "") {
      setIsEmptyError(true);
      return;
    }

    if (announcement.length > 100) {
      setIsMaxLengthError(true);
      return;
    }

    setIsSubmitting(true);
    onAdd(announcement);
    setAnnouncement("");
    setIsSubmitting(false);
    setShowForm(false);
  };

  const resetForm = () => {
    setAnnouncement("");
    setIsMaxLengthError(false);
    setIsEmptyError(false);
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <div className="card w-100 mb-3">
      <div className="card-body">
        {showForm ? (
          <>
            <h5 className="card-title ps-3">
              <FontAwesomeIcon icon={faComment} /> Post an Announcement
            </h5>
            <textarea
              className={`form-control mb-2 ${
                isMaxLengthError || isEmptyError ? "is-invalid" : ""
              }`}
              rows="3"
              value={announcement}
              onChange={handleInputChange}
            />
            {isEmptyError && (
              <div className="invalid-feedback">Field cannot be empty</div>
            )}
            {isMaxLengthError && (
              <div className="invalid-feedback">
                Text length should not exceed 100 characters
              </div>
            )}
            <small className="text-muted">{announcement.length}/100</small>
            <hr />
            <div>
              <button
                className="btn btn-primary mt-2"
                onClick={handleAddAnnouncement}
                disabled={isSubmitting || isEmptyError || isMaxLengthError}
              >
                {isSubmitting ? "Posting..." : "Post Announcement"}
              </button>

              <button
                className="btn btn-link"
                style={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={() => {
                  resetForm();
                }}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
              </button>
            </div>
          </>
        ) : (
          <h5
            className="card-title"
            style={{ cursor: "pointer" }}
            onClick={() => setShowForm(true)}
          >
            <FontAwesomeIcon icon={faMessage} className="pe-2" size="lg" />
            Click here to add an announcement
          </h5>
        )}
      </div>
    </div>
  );
};

export default AddAnnouncementForm;
