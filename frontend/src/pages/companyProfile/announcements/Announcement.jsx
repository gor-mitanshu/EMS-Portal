import React, { useState, useEffect } from "react";
import AnnouncementList from "./AnnouncementList";
import axios from "axios";

const Announcement = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ announcement: "" });
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim() === "") {
      setError("Field cannot be empty");
    } else if (value.length > 100) {
      setError("Text length should not exceed 100 characters");
    } else {
      setError("");
    }
  };

  const getAnnouncementDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/announcements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    getAnnouncementDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/announcements", {
        content: formData.announcement,
      });
      setFormData({
        announcement: "",
      });
      setIsEdit(false);
      getAnnouncementDetails();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleEdit = async (id, updatedAnnouncement) => {
    try {
      await axios.put(`http://localhost:3001/announcements/${id}`, {
        content: updatedAnnouncement,
      });
      getAnnouncementDetails();
    } catch (error) {
      console.error("Error editing announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/announcements/${id}`);
      getAnnouncementDetails();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData({
      announcement: "",
    });
    setError("");
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="card w-100 mb-3">
        <div className="card-body mt-2">
          {isEdit ? (
            <form action="" onSubmit={handleSubmit}>
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
                    value={formData.announcement}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-error">{error}</div>
              </div>
              <div >
                <button className="btn btn-danger me-3" onClick={handleCancel}>
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
            <h5
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => setIsEdit(true)}
            >
              {/* <FontAwesomeIcon icon={faMessage} className="pe-2" size="lg" /> */}
              <i className="bi bi-chat-left-quote-fill me-2 fs-4"></i>
              Click here to add an announcement
            </h5>
          )}
        </div>
      </div>

      <div className="card w-100">
        <div className="card-body">
          <h5 className="card-title">Live Announcements</h5>
          {announcements.map((announcement, index) => (
            <AnnouncementList
              key={announcement.id}
              announcements={announcement}
              error={error}
              setError={setError}
              handleInputChange={handleInputChange}
              index={index}
              id={announcement.id}
              handleDelete={() => handleDelete(announcement.id)}
              handleEdit={handleEdit}
              handleCancel={handleCancel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
