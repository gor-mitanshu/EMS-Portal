import React, {
  useCallback,
  useEffect,
  useState,
  // , useEffect
} from "react";
import CompanyPoliciesModal from "./CompanyPoliciesModal";
import axios from "axios";
import Card from "../../../UI/profileCards/ProfileCard";
import { toast } from "react-toastify";

const initialState = {
  policy_title: "",
  policy_description: "",
  policy_file: null,
};
const CompanyPolices = ({ accessToken, companyId }) => {
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
      policy_file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      policy_file: "",
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

    const formDataToSend = new FormData();
    try {
      formDataToSend.append("policy_title", formData.policy_title);
      formDataToSend.append("policy_description", formData.policy_description);
      formDataToSend.append("policy_file", formData.policy_file);

      const endpoint = editId
        ? `${process.env.REACT_APP_API}/company/updatePolicy/${editId}`
        : `${process.env.REACT_APP_API}/company/addPolicy/${companyId}`;
      const res = await axios.post(endpoint, formDataToSend, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
    setEditId(policy._id);
    setFormData({
      policy_title: policy.policy_title,
      policy_description: policy.policy_description,
      policy_file: policy.policy_file,
    });
    setShowModal(true);
  };

  const handleDelete = async (policyId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/company/deletePolicy/${policyId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data) {
        // Remove the deleted certificate from the state
        toast.success(res.data.message)
        getPolicies();
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };
  return (
    <Card title={ "Company Policies" }>
      <div>
        <button className="btn btn-primary" onClick={ handleShowModal }>
          Add
        </button>
        <CompanyPoliciesModal
          show={ showModal }
          handleClose={ handleClose }
          formData={ formData }
          formErrors={ formErrors }
          handleChange={ handleChange }
          handleSubmit={ handleSubmit }
          handleFileChange={ handleFileChange }
          editId={ editId }
        />
        { policies.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Policy Title</th>
                <th>Policy Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { policies.map((policy) => (
                <tr key={ policy._id }>
                  <td>{ policy.policy_title }</td>
                  <td>{ policy.policy_description }</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={ () => handleEdit(policy) }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={ () => handleDelete(policy._id) }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        ) : (
          <h6 className="pt-4">No Policies uploaded yet!!!</h6>
        ) }
      </div>
    </Card>
  );
};

export default CompanyPolices;
