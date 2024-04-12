import React, { useEffect } from "react";
import { useState } from "react";
import IdModal from "./IdModal";
import axios from "axios";

const initialFormData = {
  document_type: "",
  document_id: "",
  file: null,
  photo_id: false,
  date_of_birth: false,
  current_address: false,
  permanent_address: false,
};
const checkboxes = {
  PAN_CARD: [
    { label: "Photo Id", name: "photo_id" },
    { label: "Date of Birth", name: "date_of_birth" },
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  ADHAR_CARD: [
    { label: "Photo Id", name: "photo_id" },
    { label: "Date of Birth", name: "date_of_birth" },
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  PASSPORT: [
    { label: "Photo Id", name: "photo_id" },
    { label: "Date of Birth", name: "date_of_birth" },
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  VOTER_ID: [
    { label: "Photo Id", name: "photo_id" },
    { label: "Date of Birth", name: "date_of_birth" },
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  ELECTRICITY_BILL: [
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  PHONE_BILL: [
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  BANK_PASSBOOK: [
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
  RENTAL_AGREEMENT: [{ label: "Current Address", name: "current_address" }],
  DRIVING_LICENSE: [
    { label: "Photo Id", name: "photo_id" },
    { label: "Date of Birth", name: "date_of_birth" },
    { label: "Current Address", name: "current_address" },
    { label: "Permanent Address", name: "permanent_address" },
  ],
};
const Id = () => {
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    document_type: "",
    document_id: "",
    file: null,
  });
  const [editId, setEditId] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
    setFormErrors(initialFormData);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormErrors(initialFormData);
    setFormData(initialFormData);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset checkboxes when id_type changes
      photo_id: false,
      date_of_birth: false,
      current_address: false,
      permanent_address: false,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      file: "",
    });
  };

  const fetchDocuments = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/getDocument`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data) {
        // console.log(res);
        setDocuments(res.data.documentDetails);
      }
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (!formData.document_type) {
      errors.document_type = "Please Select any Id Type";
    }
    if (!formData.document_id) {
      errors.document_id = "Please enter any Certificate Title";
    }
    if (!formData.file) {
      errors.file = "Please select any file";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const proof = {
      photo_id: formData.photo_id,
      date_of_birth: formData.date_of_birth,
      current_address: formData.current_address,
      permanent_address: formData.permanent_address,
    };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("document_type", formData.document_type);
      formDataToSend.append("document_id", formData.document_id);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("proof", JSON.stringify(proof));

      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const endpoint = editId
        ? `${process.env.REACT_APP_API}/employee/updateDocument/${editId}`
        : `${process.env.REACT_APP_API}/employee/addDocument`;

      const res = await axios.post(endpoint, formDataToSend, {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      });
      if (res) {
        console.log("Submitted:", formData);
        handleClose();
        setFormData(initialFormData);
        fetchDocuments();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (document) => {
    console.log(document);
    setEditId(document._id);
    setFormData({
      document_type: document.document_type,
      document_id: document.document_id,
      proof: {
        photo_id: document.proof.photo_id,
        date_of_birth: document.proof.date_of_birth,
        current_address: document.proof.current_address,
        permanent_address: document.proof.permanent_address,
      },
      file: document.file,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (workId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteDocument/${workId}`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data.success) {
        // Remove the deleted certificate from the state
        fetchDocuments();
        const updatedCertificates = documents[0].documentDetails.filter(
          (work) => work._id !== workId
        );
        setDocuments([{ documentDetails: updatedCertificates }]);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Add
      </button>
      <IdModal
        show={showModal}
        handleClose={handleClose}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
        handleFileChange={handleFileChange}
      />
      {documents.length && documents[0].documentDetails.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents[0].documentDetails.map((work) => (
              <tr key={work._id}>
                <td>{work.document_type}</td>
                <td>{work.document_id}</td>
                {/* <td>{work.file}</td> */}
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

export default Id;
