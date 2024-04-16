import React, { useState, useEffect } from "react";
import AddAnnouncementForm from "./AnnouncementForm";
import AnnouncementList from "./AnnouncementList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Announcement = () => {
  const [showForm, setShowForm] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const handleAddForm = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAnnouncement(value);
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
      const response = await axios.get("http://localhost:3000/announcements");
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
      await axios.post("http://localhost:3000/announcements", {
        content: announcement,
      });
      setAnnouncement("");
      setShowForm(false);
      getAnnouncementDetails();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/announcements/${id}`);
      getAnnouncementDetails();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log("Edit announcement with id:", id);
  };

  const handleCancel = () => {
    setShowForm(false);
    setAnnouncement("");
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
              announcement={announcement}
              error={error}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              isEdit={false}
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
              key={index}
              announcements={announcement}
              error={error}
              setError={setError}
              handleInputChange={handleInputChange}
              index={index}
              id={announcement.id}
              handleDelete={() => handleDelete(index, announcement.id)}
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
