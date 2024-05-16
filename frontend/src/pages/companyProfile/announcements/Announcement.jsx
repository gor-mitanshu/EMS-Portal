import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Card from "../../../UI/card/Card";
import Modal from "../../../UI/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Announcement = ({ companyId, accessToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ announcement: "" });
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcementId, setAnnouncementId] = useState(null);

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

  const getAnnouncementDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/company/getAnnouncement/${companyId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const { announcement } = response.data;
      setAnnouncements(announcement);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }, [accessToken, companyId]);

  useEffect(() => {
    getAnnouncementDetails();
  }, [getAnnouncementDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = announcementId ?
        await axios.put(`${process.env.REACT_APP_API}/company/updateAnnouncement/${announcementId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        ) : await axios.post(`${process.env.REACT_APP_API}/company/addAnnouncement/${companyId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

      if (response) {
        setFormData(formData)
        toast.success(response.data.message)
        setFormData({
          announcement: "",
        });
        getAnnouncementDetails();
        handleCloseModal()
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleEdit = (announcement) => {
    setAnnouncementId(announcement._id);
    setFormData(announcement);
    setShowModal(true);
  }

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Confirm Delete',
        text: "Are you sure you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`${process.env.REACT_APP_API}/company/deleteAnnouncement/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (res) {
            toast.success(res.data.message)
            getAnnouncementDetails();
          }
        } else {
          return;
        }
      })
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ announcement: "" });
    setError("");
    setIsSubmitting(false);
    setAnnouncementId(null);
  };

  return (
    <>
      <Card title='Announcements' addBtn={true} addBtnTitle={"Add Announcement"} handleAdd={() => setShowModal(true)}>
        {announcements.map((announcement, index) => (
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom" key={announcement._id}>
            <h5 className="m-0">{announcement.announcement}</h5>
            <div>
              <button className="btn btn-link" onClick={() => { handleEdit(announcement) }}>
                <FontAwesomeIcon icon={faEdit} color="blue" />
              </button>
              <button className="btn btn-link" onClick={() => { handleDelete(announcement._id) }}>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </button>
            </div>
          </div>
        ))}
      </Card>
      <Modal show={showModal} handleCloseModal={handleCloseModal} title={announcementId ? "Edit Announcement" : "Add Announcement"}>
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
            <button className="btn btn-danger me-3" type="button" onClick={handleCloseModal}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              {isSubmitting ? "Posting..." : "Post Announcement"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Announcement;
