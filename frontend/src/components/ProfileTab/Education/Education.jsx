import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  const [showForm, setShowForm] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    qualification_type: "",
    course_name: "",
    course_type: "",
    stream: "",
    course_startDate: "",
    course_endDate: "",
    college_name: "",
    university_name: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddClick = () => {
    setShowForm(true);
    setEditIndex(null);
    setFormData({
      qualification_type: "",
      course_name: "",
      course_type: "",
      stream: "",
      course_startDate: "",
      course_endDate: "",
      college_name: "",
      university_name: "",
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
      qualification_type: "",
      course_name: "",
      course_type: "",
      stream: "",
      course_startDate: "",
      course_endDate: "",
      college_name: "",
      university_name: "",
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
                <div className="row">
                  {/* Qualification Type */}
                  <div className="col-md-12">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="qualification_type"
                          className="font-weight-bold"
                        >
                          Qualification Type:
                        </label>
                        <select
                          className="form-select no-focus-box-shadow"
                          name="qualification_type"
                          value={formData.qualification_type}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Qualification Type</option>
                          <option value="Full Time">Graduation</option>
                          <option value="Part Time">Post Graduation</option>
                          <option value="On Contract">Doctorate</option>
                          <option value="Intern">Diploma</option>
                          <option value="Intern">Pre University</option>
                          <option value="Intern">Other Education</option>
                          <option value="Intern">Certificate</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* Course Name */}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="course_name"
                          className="font-weight-bold"
                        >
                          Course Name:
                        </label>
                        <input
                          type="text"
                          className="form-control no-focus-box-shadow"
                          placeholder="Course Name"
                          name="course_name"
                          value={formData.course_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Course Type */}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="course_type"
                          className="font-weight-bold"
                        >
                          Course Type:
                        </label>
                        <select
                          className="form-select no-focus-box-shadow"
                          name="course_type"
                          value={formData.course_type}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Employment Type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="On Contract">Correspondance</option>
                          <option value="Intern">Certificate</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Stream */}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label htmlFor="stream" className="font-weight-bold">
                          Stream:
                        </label>
                        <input
                          type="text"
                          className="form-control no-focus-box-shadow"
                          placeholder="Stream"
                          name="stream"
                          value={formData.stream}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* Course Start Date */}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="course_startDate"
                          className="font-weight-bold"
                        >
                          Course Start Date:
                        </label>
                        <input
                          type="date"
                          className="form-control no-focus-box-shadow"
                          placeholder="Course Start Date"
                          name="course_startDate"
                          value={formData.course_startDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Course End Date */}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="course_startDate"
                          className="font-weight-bold"
                        >
                          Course Start Date:
                        </label>
                        <input
                          type="date"
                          className="form-control no-focus-box-shadow"
                          placeholder="Course Start Date"
                          name="course_startDate"
                          value={formData.course_startDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* College Name*/}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="college_name"
                          className="font-weight-bold"
                        >
                          College Name:
                        </label>
                        <input
                          type="text"
                          className="form-control no-focus-box-shadow"
                          placeholder="College Name"
                          name="college_name"
                          value={formData.college_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* University Name */}
                  <div className="col-md-4">
                    <div className="form-group row">
                      <div className="col mb-3">
                        <label
                          htmlFor="university_name"
                          className="font-weight-bold"
                        >
                          University Name:
                        </label>
                        <input
                          type="text"
                          className="form-control no-focus-box-shadow"
                          placeholder="University Name"
                          name="university_name"
                          value={formData.university_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            )}
            {educationList.map((education, index) => (
              <div key={index}>
                <p>
                  <strong>Qualification Type:</strong>{" "}
                  {education.qualification_type}
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
                  <strong>Course Start Date:</strong>{" "}
                  {education.course_startDate}
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
