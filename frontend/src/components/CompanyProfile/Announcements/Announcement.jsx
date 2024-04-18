import React, { useState, useEffect } from "react";
import AddAnnouncementForm from "./AnnouncementForm";
import AnnouncementList from "./AnnouncementList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Announcement = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ announcement: "" });
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddForm = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      setShowForm(false);
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
    setShowForm(false);
    setFormData({
      announcement: "",
    });
    setError("");
    setIsSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <div className="card w-100 mb-3">
        <div className="card-body">
          <h5 className="card-title">Announcements</h5>
        </div>
      </div>

      <div className="card w-100 mb-3">
        <div className="card-body">
          {showForm ? (
            <AddAnnouncementForm
              announcement={formData.announcement}
              error={error}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              isEdit={false}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          ) : (
            <h5
              className="card-title"
              style={{ cursor: "pointer" }}
              onClick={handleAddForm}
            >
              <FontAwesomeIcon icon={faMessage} className="pe-2" size="lg" />
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
