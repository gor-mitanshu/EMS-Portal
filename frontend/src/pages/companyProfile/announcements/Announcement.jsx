import React, { useState, useEffect, useCallback } from "react";
import AnnouncementList from "./AnnouncementList";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Announcement = ({ companyId, accessToken }) => {
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
  const getAnnouncementDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/company/getAnnouncement/${companyId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const { announcement } = response.data
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
      const response = await axios.post(
        `${process.env.REACT_APP_API}/company/addAnnouncement/${companyId}`,
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
        setIsEdit(false);
        getAnnouncementDetails();
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleEdit = async (id, announcement) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/company/updateAnnouncement/${id}`,
        { announcement: announcement }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
      );
      if (res) {
        toast.success(res.data.message)
        getAnnouncementDetails();
      }
    } catch (error) {
      console.error("Error editing announcement:", error);
    }
  };

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
          { isEdit ? (
            <form action="" onSubmit={ handleSubmit }>
              <div className="text-start">
                <div
                  className={ `form-input-wrapper ${error ? "error-form-input" : ""
                    }` }
                >
                  <i className="bi bi-chat-left-quote-fill prefix-icon"></i>
                  <textarea
                    className="form-input"
                    placeholder="Add Announcement"
                    name="announcement"
                    rows="1"
                    value={ formData.announcement }
                    onChange={ handleInputChange }
                  />
                </div>
                <div className="input-error">{ error }</div>
              </div>
              <div >
                <button className="btn btn-danger me-3" onClick={ handleCancel }>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  { isSubmitting ? "Posting..." : "Post Announcement" }
                </button>
              </div>
            </form>
          ) : (
            <h5
              className="d-flex align-items-center"
              style={ { cursor: "pointer" } }
              onClick={ () => setIsEdit(true) }
            >
              {/* <FontAwesomeIcon icon={faMessage} className="pe-2" size="lg" /> */ }
              <i className="bi bi-chat-left-quote-fill me-2 fs-4"></i>
              Click here to add an announcement
            </h5>
          ) }
        </div>
      </div>

      <div className="card w-100">
        <div className="card-body">
          <h5 className="card-title">Live Announcements</h5>
          <hr />
          { announcements.map((announcement, index) => (
            <AnnouncementList
              key={ announcement._id }
              announcements={ announcement }
              error={ error }
              setError={ setError }
              handleInputChange={ handleInputChange }
              index={ index }
              id={ announcement.id }
              handleDelete={ () => handleDelete(announcement._id) }
              handleEdit={ handleEdit }
              handleCancel={ handleCancel }
            />
          )) }
        </div>
      </div>
    </div>
  );
};

export default Announcement;
