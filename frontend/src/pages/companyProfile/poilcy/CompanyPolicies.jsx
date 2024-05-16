import React, { useCallback, useEffect, useState, } from "react";
import axios from "axios";
import Card from "../../../UI/card/Card";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Modal from "../../../UI/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  title: "",
  description: "",
  file: null,
};
const CompanyPolices = ({ accessToken, companyId }) => {
  const [showModal, setShowModal] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(initialState);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [policyId, setPolicyId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setFormErrors(initialState);
    setFormData(initialState);
    setPolicyId(null);
    setSelectedPolicy(initialState)
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
      file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      file: "",
    });
  };

  const getPolicies = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/company/getPolicy/${companyId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data) {
        setPolicies(res.data.policy);
      }
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  }, [accessToken, companyId]);

  useEffect(() => {
    getPolicies();
  }, [getPolicies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.title) {
      errors.title = "Please Enter Your Policy Title";
    }
    if (!formData.description) {
      errors.description = "Please enter your Policy Description";
    }
    if (!formData.file) {
      errors.file = "Please select any file";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formDataToSend = new FormData();
    try {
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("file", formData.file);

      const res = policyId
        ? await axios.put(`${process.env.REACT_APP_API}/company/updatePolicy/${policyId}`,
          formDataToSend,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }) :
        await axios.post(`${process.env.REACT_APP_API}/company/addPolicy/${companyId}`,
          formDataToSend,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
      if (res) {
        toast.success(res.data.message)
        handleClose();
        setFormData(initialState);
        getPolicies();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (policy) => {
    setPolicyId(policy._id);
    setFormData(policy);
    setSelectedPolicy(policy)
    setShowModal(true);
  };

  const handleDelete = async (policyId) => {
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
            `${process.env.REACT_APP_API}/company/deletePolicy/${policyId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (res.data) {
            toast.success(res.data.message)
            getPolicies();
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
      changedData.title !== selectedPolicy.title ||
      changedData.description !== selectedPolicy.description ||
      changedData.file !== selectedPolicy.file
    )
  }

  const handleCancel = () => {
    console.log(selectedPolicy)
    if (hasChanges(formData)) {
      Swal.fire({
        title: "Are you sure?",
        text: "Changes will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Don't Save!",
      }).then((result) => {
        result.isConfirmed && handleClose();
      });
    } else {
      handleClose();
    }
  }

  return (
    <Card title={"Company Policies"} addBtn={true} addBtnTitle={"Add policy"} handleAdd={() => { setShowModal(true); setFormData(initialState); }}>
      <>
        <Modal show={showModal} handleCloseModal={handleCancel} title={policyId ? "Edit Policy" : "Add Policy"}>
          <form onSubmit={handleSubmit}>
            <div className="text-start">
              <div
                className={`form-input-wrapper px-2 ${formErrors.title ? "error-form-input" : ""
                  }`}
              >
                <label htmlFor="title" className="fw-medium mb-1">
                  Policy title
                </label>
                <input type="text" className="form-input px-2" id="title" placeholder="Enter Title"
                  name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="input-error">{formErrors.title}</div>
            </div>
            <div className="text-start">
              <div
                className={`form-input-wrapper px-2 ${formErrors.description ? "error-form-input" : ""
                  }`}
              >
                <label htmlFor="description" className="fw-medium mb-1">
                  Description
                </label>
                <textarea type="text" className="form-input px-2" id="description"
                  placeholder="Enter description" name="description" rows={2} value={formData.description}
                  onChange={handleChange} />
              </div>
              <div className="input-error">{formErrors.description}</div>
            </div>
            <div>
              <label className="fw-medium mb-3">Upload Policy</label>
              <div className="d-flex">
                <label htmlFor="file" className="upload-file">
                  <FontAwesomeIcon icon={faPlus} width={16} />
                </label>
                <h6 className="mt-3 mb-0 ms-3">{((formData.file && formData.file.name) && formData.file.name)}</h6>
                <h6 className="mt-3 mb-0 ms-3">{(!(formData.file && formData.file.name) && (selectedPolicy && selectedPolicy.file) && selectedPolicy.file)}</h6>
              </div>
              <input type="file" name="file" id="file" accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileChange} className="d-none" />
              <div className="input-error">{formErrors.file}</div>
            </div>

            <div className="d-flex align-items-center justify-content-end mt-3">
              <button className="me-2 btn btn-danger" type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal>
        {policies.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Policy Title</th>
                <th>Policy Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy._id}>
                  <td>{policy.title}</td>
                  <td>{policy.description}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(policy)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(policy._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h6 className="pt-4">No Policies uploaded yet!!!</h6>
        )}
      </>
    </Card>
  );
};

export default CompanyPolices;
