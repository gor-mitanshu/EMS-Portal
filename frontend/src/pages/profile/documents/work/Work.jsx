import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WorkModal from "../work/WorkModal";
import { toast } from 'react-toastify'
import Swal from "sweetalert2";

const Work = ({ userId, accessToken }) => {
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

  const getWorkDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/getWorkDocument/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data) {
        setWorks(res.data.workData);
      }
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getWorkDetails();
  }, [getWorkDetails]);

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

      const endpoint = editId
        ? `${process.env.REACT_APP_API}/employee/updateWorkDocument/${editId}`
        : `${process.env.REACT_APP_API}/employee/addWorkDocument/${userId}`;
      const res = await axios.post(endpoint, formDataToSend, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data) {
        toast.success(res.data.message);
        handleClose();
        getWorkDetails();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
            `${process.env.REACT_APP_API}/employee/deleteWorkDocument/${workId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (res.data) {
            toast.success(res.data.message)
            getWorkDetails()
          }
        } else {
          return;
        }
      })
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={ handleShowModal }>
        Add Achievements
      </button>
      <WorkModal
        show={ showModal }
        handleClose={ handleClose }
        formData={ formData }
        formErrors={ formErrors }
        handleChange={ handleChange }
        handleFileChange={ handleFileChange }
        handleSubmit={ handleSubmit }
        editId={ editId }
      />
      { works.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { works.map((work) => (
              <tr key={ work._id }>
                <td>{ work.work_name }</td>
                <td>{ work.work_description }</td>
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

export default Work;
