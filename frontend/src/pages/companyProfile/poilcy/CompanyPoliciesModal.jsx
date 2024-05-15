import React from "react";
import Modal from "../../../UI/modal/Modal"

const CompanyPoliciesModal = ({
  show,
  formData,
  formErrors,
  handleChange,
  handleFileChange,
  handleSubmit,
  policyId,
  handleCancel
}) => {

  return (
    <Modal show={ show } handleCancel={ handleCancel } title={policyId ? "Edit Policy" : "Add Policy" }>
      <form onSubmit={ handleSubmit }>
        <label>Title</label>
        <input
          type="text"
          name="policy_title"
          className="form-group no-focus-box-shadow"
          placeholder="Enter Title"
          value={ formData.policy_title }
          onChange={ handleChange }
        />
        { formErrors.policy_title && (
          <small className="text-danger">{ formErrors.policy_title }</small>
        ) }
        {/* Description */ }
        <label>Description</label>
        <input
          type="text"
          name="policy_description"
          className="form-group no-focus-box-shadow"
          placeholder="Enter Description"
          value={ formData.policy_description }
          onChange={ handleChange }
        />
        { formErrors.policy_description && (
          <small className="text-danger">
            { formErrors.policy_description }
          </small>
        ) }
        {/* File Selection */ }
        <label>Select File</label>
        <input
          type="file"
          name="policy_file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={ handleFileChange }
        />
        { formErrors.policy_file && (
          <small className="text-danger">{ formErrors.policy_file }</small>
        ) }
        <button
          className="me-2 btn-danger"
          onClick={ handleCancel }
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary"
        >
          Save
        </button>
      </form>
    </Modal>
  );
};

export default CompanyPoliciesModal;
