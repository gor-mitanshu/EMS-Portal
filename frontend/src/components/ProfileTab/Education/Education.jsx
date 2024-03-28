import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  const [showForm, setShowForm] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    institute: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddClick = () => {
    setShowForm(true);
    setEditIndex(null);
    setFormData({
      institute: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEditClick = (index) => {
    setShowForm(true);
    setEditIndex(index);
    setFormData(educationList[index]);
  };

  const handleDeleteClick = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedList = [...educationList];
      updatedList[editIndex] = formData;
      setEducationList(updatedList);
    } else {
      setEducationList([...educationList, formData]);
    }
    setShowForm(false);
    setFormData({
      institute: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });
    setEditIndex(null);
  };

  return (
    <>
      <div className="col-md-12">
        <ProfileField title="Education">
          <>
            {!showForm && (
              <button className="btn btn-primary" onClick={handleAddClick}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  color="white"
                  style={{ paddingRight: "10px" }}
                />
                Add
              </button>
            )}
            {showForm && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="institute">Institute:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="institute"
                    name="institute"
                    value={formData.institute}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="degree">Degree:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </div>
                {!editIndex && (
                  <>
                    <div className="form-group">
                      <label htmlFor="fieldOfStudy">Field of Study:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="startDate">Start Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endDate">End Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            )}
            {educationList.map((education, index) => (
              <div key={index}>
                <p>
                  <strong>Institute:</strong> {education.institute}
                </p>
                <p>
                  <strong>Degree:</strong> {education.degree}
                </p>
                {!editIndex && (
                  <>
                    <p>
                      <strong>Field of Study:</strong> {education.fieldOfStudy}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {education.startDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {education.endDate}
                    </p>
                  </>
                )}
                <div>
                  <button
                    className="btn btn-link"
                    onClick={() => handleEditClick(index)}
                  >
                    <FontAwesomeIcon icon={faEdit} color="blue" />
                  </button>
                  <button
                    className="btn btn-link"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" />
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </>
        </ProfileField>
      </div>
    </>
  );
};

export default Education;
