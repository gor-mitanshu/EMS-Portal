import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import FamilyForm from "./FamilyForm";

const FamilyItem = ({
  family,
  handleDeleteClick,
  valueIndex,
  onSaveEdit,
  formErrors,
  setFormErrors,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    family_name: family.family_name,
    family_relationship: family.family_relationship,
    family_birth_date: family.family_birth_date,
    dependant: family.dependant,
  });

  const handleEditClick = () => {
    setFormData({
      family_name: family.family_name,
      family_relationship: family.family_relationship,
      family_birth_date: family.family_birth_date,
      dependant: family.dependant,
    });
    // Reset form errors
    setFormErrors({
      qualification_type: "",
      course_name: "",
      course_type: "",
      stream: "",
      course_startDate: "",
      course_endDate: "",
      college_name: "",
      university_name: "",
    });
    setEditMode(true);
  };

  const handleInputChange = (e) => {
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

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Handling the errors
    let errors = {};

    // Validate each form field
    if (!formData.family_name) {
      errors.family_name = "Name is required";
    }
    if (!formData.family_relationship) {
      errors.family_relationship = "Relationship is required";
    }
    if (!formData.family_birth_date) {
      errors.family_birth_date = "Birth Date is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onSaveEdit(valueIndex, formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      family_name: family.family_name,
      family_relationship: family.family_relationship,
      family_birth_date: family.family_birth_date,
      dependant: family.dependant,
    });
    setFormErrors({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
    setEditMode(false);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-end">
          {!editMode && (
            <>
              <button className="btn btn-link" onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} color="blue" />
              </button>
              <button className="btn btn-link" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </button>
            </>
          )}
        </div>

        {editMode ? (
          <FamilyForm
            formData={formData}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSaveClick}
            handleCancel={handleCancel}
          />
        ) : (
          <>
            <div className="row">
              <div className="col-md-3">
                <p className="mb-1">
                  <strong>Name:</strong> {family.family_name}
                </p>
              </div>
              <div className="col-md-3">
                <p className="mb-1">
                  <strong>Relationship:</strong> {family.family_relationship}
                </p>
              </div>
              <div className="col-md-3">
                <p className="mb-1">
                  <strong>Date of Birth:</strong> {family.family_birth_date}
                </p>
              </div>
              <div className="col-md-3">
                <p className="mb-1">
                  <strong>Dependant:</strong> {family.dependant}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyItem;
