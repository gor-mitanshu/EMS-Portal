import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EducationForm from "./EducationForm";

const EducationItem = ({
  education,
  handleDeleteClick,
  valueIndex,
  onSaveEdit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    qualification_type: education.qualification_type,
    course_name: education.course_name,
    course_type: education.course_type,
    stream: education.stream,
    course_startDate: education.course_startDate,
    course_endDate: education.course_endDate,
    college_name: education.college_name,
    university_name: education.university_name,
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
          <EducationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSaveClick}
            handleCancel={handleCancel}
          />
        ) : (
          <>
            <div className="row">
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>Qualification Type:</strong>{" "}
                  {education.qualification_type}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>Course Name:</strong> {education.course_name}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>Course Type:</strong> {education.course_type}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>Stream:</strong> {education.stream}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>Course Start Date:</strong>{" "}
                  {education.course_startDate}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>Course End Date:</strong> {education.course_endDate}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>College Name:</strong> {education.college_name}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>University Name:</strong> {education.university_name}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationItem;
