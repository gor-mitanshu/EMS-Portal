import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAnnouncementForm from "./AnnouncementForm";
import AnnouncementList from "./AnnouncementList";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:3001/announcements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleAddAnnouncement = async (announcement) => {
    try {
      if (editingIndex !== null) {
        await axios.put(`http://localhost:3001/announcements/${editingIndex}`, {
          content: announcement,
        });
        setEditingIndex(null);
      } else {
        await axios.post("http://localhost:3001/announcements", {
          content: announcement,
        });
      }
      fetchAnnouncements();
    } catch (error) {
      console.error("Error adding/editing announcement:", error);
    }
  };

  const handleEditAnnouncement = (index) => {
    setEditingIndex(index);
  };

  const handleDeleteAnnouncement = async (index) => {
    try {
      await axios.delete(`http://localhost:3001/announcements/${index}`);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="container mt-5">
      <AddAnnouncementForm
        onAdd={handleAddAnnouncement}
        initialAnnouncement={
          editingIndex !== null ? announcements[editingIndex].content : ""
        }
      />
      <AnnouncementList
        announcements={announcements.map((a, index) => ({ ...a, id: index }))}
        onEdit={handleEditAnnouncement}
        onDelete={handleDeleteAnnouncement}
      />
    </div>
  );
};

export default Announcement;
