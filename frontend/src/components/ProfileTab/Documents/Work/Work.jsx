import React, { useState, useEffect } from "react";
import WorkModal from "./WorkModal";
import axios from "axios";

const Work = () => {
  const [showModal, setShowModal] = useState(false);
  const [works, setWorks] = useState([]);
  const [formData, setFormData] = useState({
    work_name: "",
    work_description: "",
    work_file: null,
  });
  const [formErrors, setFormErrors] = useState({
    work_name: "",
    work_description: "",
    work_file: "",
  });
  const [editId, setEditId] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
    setFormErrors({
      work_name: "",
      work_description: "",
      work_file: "",
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setFormErrors({
      work_name: "",
      work_description: "",
      work_file: "",
    });
    setFormData({
      work_name: "",
      work_description: "",
      work_file: null,
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      work_file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      work_file: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field
    if (!formData.work_name) {
      errors.work_name = "Please Enter Your Document Title";
    }
    if (!formData.work_description) {
      errors.work_description = "Please enter your work description";
    }
    if (!formData.work_file) {
      errors.work_file = "Please select any file";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("work_name", formData.work_name);
      formDataToSend.append("work_description", formData.work_description);
      formDataToSend.append("work_file", formData.work_file);

      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const endpoint = editId
        ? `${process.env.REACT_APP_API}/employee/updateWork/${editId}`
        : `${process.env.REACT_APP_API}/employee/addWork`;
      const res = await axios.post(endpoint, formDataToSend, {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      });
      if (res.data.success) {
        console.log("Submitted:", formData);
        handleClose();
        fetchCertificates();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/getWork`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data) {
        // console.log(res);
        setWorks(res.data.workDetails);
      }
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  const handleEdit = (work) => {
    // console.log(certificate);
    setEditId(work._id);
    setFormData({
      work_name: work.work_name,
      work_description: work.work_description,
      work_file: work.work_file,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (workId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteWork/${workId}`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data.success) {
        // Remove the deleted certificate from the state
        const updatedCertificates = works[0].workDetails.filter(
          (work) => work._id !== workId
        );
        setWorks([{ workDetails: updatedCertificates }]);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Add Achievements
      </button>
      <WorkModal
        show={showModal}
        handleClose={handleClose}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      {works.length && works[0].workDetails.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {works[0].workDetails.map((work) => (
              <tr key={work._id}>
                <td>{work.work_name}</td>
                <td>{work.work_description}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(work)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(work._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4 className="pt-4">No data found</h4>
      )}
    </div>
  );
};

export default Work;
