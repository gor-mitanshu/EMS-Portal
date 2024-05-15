import React, { useState, useEffect, useCallback, useRef } from "react";
import CertificateModal from "./CertificateModal";
import axios from "axios";
import { toast } from 'react-toastify'
import Swal from "sweetalert2";

const Certificate = ({ userId, accessToken }) => {
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
  const initialUser = useRef({
    certificate_name: "",
    certificate_title: "",
  })
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
  const fetchCertificates = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/getCertificate/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data) {
        setCertificates(res.data.certificateData);
        setFormData(res.data.certificateData);
        initialUser.current = res.data.certificateData;
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  }, [accessToken, userId]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

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

      const endpoint = editId
        ? `${process.env.REACT_APP_API}/employee/updateCertificate/${editId}`
        : `${process.env.REACT_APP_API}/employee/addCertificate/${userId}`;
      const res = await axios.post(endpoint, formDataToSend, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data) {
        toast.success(res.data.message);
        handleClose();
        fetchCertificates();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (certificate) => {
    setEditId(certificate._id);
    setFormData({
      certificate_name: certificate.certificate_name,
      certificate_title: certificate.certificate_title,
      certificate_file: certificate.certificate_file,
    });
    setShowModal(true);
  };

  const handleDelete = async (certificateId) => {
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
            `${process.env.REACT_APP_API}/employee/deleteCertificate/${certificateId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (res.data) {
            toast.success(res.data.message);
            fetchCertificates()
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
      changedData.certificate_name !== initialUser.current[0].certificate_name ||
      changedData.certificate_title !== initialUser.current[0].certificate_title ||
      changedData.certificate_file !== initialUser.current[0].certificate_file
    );
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={ handleShowModal }>
        Add Certificate
      </button>
      <CertificateModal
        show={ showModal }
        handleClose={ handleClose }
        formData={ formData }
        formErrors={ formErrors }
        handleChange={ handleChange }
        handleFileChange={ handleFileChange }
        handleSubmit={ handleSubmit }
        hasChanges={ hasChanges }
      />
      { certificates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { certificates.map((certificate) => (
              <tr key={ certificate._id }>
                <td>{ certificate.certificate_name }</td>
                <td>{ certificate.certificate_title }</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={ () => handleEdit(certificate) }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={ () => handleDelete(certificate._id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      ) : (
        <h4>No data found</h4>
      ) }
    </div>
  );
};

export default Certificate;
