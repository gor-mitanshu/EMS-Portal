import React, { useState, useEffect } from "react";
import CertificateModal from "./CertificateModal";
import axios from "axios";

const Certificate = () => {
  const [showModal, setShowModal] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    certificate_name: "",
    certificate_title: "",
    certificate_file: null,
  });
  const [formErrors, setFormErrors] = useState({
    certificate_name: "",
    certificate_title: "",
    certificate_file: "",
  });
  const [editId, setEditId] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormErrors({
      certificate_name: "",
      certificate_title: "",
      certificate_file: "",
    });
    setFormData({
      certificate_name: "",
      certificate_title: "",
      certificate_file: null,
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
      certificate_file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      certificate_file: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field
    if (!formData.certificate_name) {
      errors.certificate_name = "Please select any Course Type";
    }
    if (!formData.certificate_title) {
      errors.certificate_title = "Please enter any Certificate Title";
    }
    if (!formData.certificate_file) {
      errors.certificate_file = "Please select any file";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("certificate_name", formData.certificate_name);
      formDataToSend.append("certificate_title", formData.certificate_title);
      formDataToSend.append("certificate_file", formData.certificate_file);

      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const endpoint = editId
        ? `${process.env.REACT_APP_API}/employee/updateCertificate/${editId}`
        : `${process.env.REACT_APP_API}/employee/addCertificate`;
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
        `${process.env.REACT_APP_API}/employee/getCertificate`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data) {
        setCertificates(res.data.certificateDetails);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleEdit = (certificate) => {
    // console.log(certificate);
    setEditId(certificate._id);
    setFormData({
      certificate_name: certificate.certificate_name,
      certificate_title: certificate.certificate_title,
      certificate_file: certificate.certificate_file,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (certificateId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteCertificate/${certificateId}`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data.success) {
        // Remove the deleted certificate from the state
        const updatedCertificates = certificates[0].certificateDetails.filter(
          (certificate) => certificate._id !== certificateId
        );
        setCertificates([{ certificateDetails: updatedCertificates }]);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Add Certificate
      </button>
      <CertificateModal
        show={showModal}
        handleClose={handleClose}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      {certificates.length && certificates[0].certificateDetails.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates[0].certificateDetails.map((certificate) => (
              <tr key={certificate._id}>
                <td>{certificate.certificate_name}</td>
                <td>{certificate.certificate_title}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(certificate)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(certificate._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>No data found</h4>
      )}
    </div>
  );
};

export default Certificate;
