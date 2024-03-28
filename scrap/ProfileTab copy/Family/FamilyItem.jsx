import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import FamilyForm from "./FamilyForm";

const FamilyItem = ({ family, handleDeleteClick, valueIndex, onSaveEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    family_name: family.family_name,
    family_relationship: family.family_relationship,
    family_birth_date: family.family_birth_date,
    dependant: family.dependant,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    onSaveEdit(valueIndex, formData);
    setEditMode(false);
  };
  const handleCancel = () => {
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
