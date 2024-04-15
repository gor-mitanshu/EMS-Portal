import React, { useState, useEffect } from "react";
import CompanyPoliciesModal from "./CompanyPoliciesModal";
import axios from "axios";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";

const initialState = {
  policy_title: "",
  policy_description: "",
  policy_file: "",
};
const CompanyPolices = () => {
  const [showModal, setShowModal] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [editId, setEditId] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
    setFormErrors(initialState);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormErrors(initialState);
    setFormData(initialState);
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
    if (!formData.policy_title) {
      errors.policy_title = "Please Enter Your Policy Title";
    }
    if (!formData.policy_description) {
      errors.policy_description = "Please enter your Policy Description";
    }
    if (!formData.policy_file) {
      errors.policy_file = "Please select any file";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("policy_title", formData.policy_title);
      formDataToSend.append("policy_description", formData.policy_description);
      formDataToSend.append("policy_file", formData.policy_file);

      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const endpoint = editId
        ? `${process.env.REACT_APP_API}/company/updatePolicy/${editId}`
        : `${process.env.REACT_APP_API}/company/addPolicy`;
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
        `${process.env.REACT_APP_API}/company/getPolicy`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data) {
        // console.log(res);
        setPolicies(res.data.workDetails);
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const handleEdit = (policy) => {
    // console.log(certificate);
    setEditId(policy._id);
    setFormData({
      policy_title: policy.policy_title,
      policy_description: policy.policy_description,
      policy_file: policy.policy_file,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (policyId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/company/deletePolicy/${policyId}`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res.data.success) {
        // Remove the deleted certificate from the state
        const updatedPolicies = policies[0].policyDetails.filter(
          (policy) => policy._id !== policyId
        );
        setPolicies([{ policyDetails: updatedPolicies }]);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };
  return (
    <ProfileField title={"Company Policies"}>
      <div>
        <button className="btn btn-primary" onClick={handleShowModal}>
          Add
        </button>
        <CompanyPoliciesModal
          show={showModal}
          handleClose={handleClose}
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
        {policies.length && policies[0].workDetails.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Policy Title</th>
                <th>Policy Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {policies[0].policyDetails.map((policy) => (
                <tr key={policy._id}>
                  <td>{policy.work_name}</td>
                  <td>{policy.work_description}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(policy)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(policy._id)}
                    >
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
      </div>
    </ProfileField>
  );
};

export default CompanyPolices;
