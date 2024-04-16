import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";

const AddAnnouncementForm = ({
  announcement,
  error,
  handleInputChange,
  handleSubmit,
  handleCancel,
  isEdit,
}) => {
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h5 className="card-title ps-3">
          <FontAwesomeIcon icon={faComment} className="pe-2" />
          {isEdit ? "Edit an Announcement" : "Post an Announcement"}
        </h5>
        <textarea
          className={`form-control mb-2 ${error ? "is-invalid" : ""}`}
          name="announcement"
          rows="3"
          value={announcement}
          onChange={handleInputChange}
        />
        <div className="invalid-feedback">{error}</div>
        <small className="text-muted">{announcement.length}/100</small>
        <hr />
        <div>
          {isEdit ? (
            <button className="btn btn-danger my-2 me-2" onClick={handleCancel}>
              Cancel
            </button>
          ) : (
            <button
              className="btn btn-link"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
            </button>
          )}
          <button
            className="btn btn-primary my-2"
            onClick={handleSubmit}
            disabled={error}
          >
            {isEdit ? "Save" : "Post"}
            {/* {isSubmitting ? "Posting..." : "Post Announcement"} */}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddAnnouncementForm;
