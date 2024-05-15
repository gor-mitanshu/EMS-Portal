import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import IdModal from "./IdModal";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
const Id = ({ userId, accessToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    document_type: "",
    document_id: "",
    file: null,
  });
  const initialUser = useRef({
    document_type: "",
    document_id: "",
    file: null,
  })
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

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/getDocument/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data) {
        // console.log(res);
        setFormData(res.data.documentData);
        setDocuments(res.data.documentData);
        initialUser.current = res.data.documentData;
      }
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  }, [accessToken, userId]);

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

      const endpoint = editId
        ? `${process.env.REACT_APP_API}/employee/updateDocument/${editId}`
        : `${process.env.REACT_APP_API}/employee/addDocument/${userId}`;

      const res = await axios.post(endpoint, formDataToSend, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res) {
        toast.success(res.data.message)
        handleClose();
        setFormData(initialFormData);
        fetchDocuments();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (document) => {
    setEditId(document._id);
    setFormData({
      document_type: document.document_type,
      document_id: document.document_id,
      photo_id: document.photo_id,
      date_of_birth: document.date_of_birth,
      current_address: document.current_address,
      permanent_address: document.permanent_address,
      file: document.file,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDelete = async (workId) => {
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
          const res = await axios.delete(
            `${process.env.REACT_APP_API}/employee/deleteDocument/${workId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (res.data) {
            fetchDocuments();
            toast.success(res.data.message)
          }
        } else {
          return;
        }
      })
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const hasChanges = (changedData) => {
    return (
      changedData.document_type !== initialUser.current[0].document_type ||
      changedData.document_id !== initialUser.current[0].document_id ||
      changedData.file !== initialUser.current[0].file
    );
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={ handleShowModal }>
        Add
      </button>
      <IdModal
        show={ showModal }
        handleClose={ handleClose }
        formData={ formData }
        formErrors={ formErrors }
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
        checkboxes={ checkboxes }
        handleCheckboxChange={ handleCheckboxChange }
        handleFileChange={ handleFileChange }
        editId={ editId }
        hasChanges={ hasChanges }
      />
      { documents.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { documents.map((work) => (
              <tr key={ work._id }>
                <td>{ work.document_type }</td>
                <td>{ work.document_id }</td>
                {/* <td>{work.file}</td> */ }
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={ () => handleEdit(work) }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={ () => handleDelete(work._id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      ) : (
        <h4 className="pt-4">No data found</h4>
      ) }
    </div>
  );
};

export default Id;
