import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const EducationItem = ({ education, onEditClick, onDeleteClick }) => {
  console.log(onEditClick);
  console.log(onDeleteClick);
  return (
    <div>
      <p>
        <strong>Qualification Type:</strong> {education.qualification_type}
      </p>
      <p>
        <strong>Course Name:</strong> {education.course_name}
      </p>
      <p>
        <strong>Course Type:</strong> {education.course_type}
      </p>
      <p>
        <strong>Stream:</strong> {education.stream}
      </p>
      <p>
        <strong>Course Start Date:</strong> {education.course_startDate}
      </p>
      <p>
        <strong>Course End Date:</strong> {education.course_endDate}
      </p>
      <p>
        <strong>College Name:</strong> {education.college_name}
      </p>
      <p>
        <strong>University Name:</strong> {education.university_name}
      </p>
      <div>
        <button className="btn btn-link" onClick={onEditClick}>
          <FontAwesomeIcon icon={faEdit} color="blue" />
        </button>
        <button className="btn btn-link" onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrash} color="red" />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default EducationItem;
