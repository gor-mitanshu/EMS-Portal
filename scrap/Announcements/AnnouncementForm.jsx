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
  console.log(announcement);
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h5 className="card-title ps-3">
          <FontAwesomeIcon icon={faComment} /> Post an Announcement
        </h5>
        <textarea
          className={`form-control mb-2`}
          rows="3"
          value={announcement}
          onChange={handleInputChange}
        />
        <small className="text-muted">{announcement.length}/100</small>
        <hr />
        <div>
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            {isEdit ? "Save" : "Post"}
            {/* {isSubmitting ? "Posting..." : "Post Announcement"} */}
          </button>

          <button
            className="btn btn-link"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={handleCancel}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
          </button>
        </div>
      </form>
    </>
  );
};

export default AddAnnouncementForm;
