import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";

const Education = () => {
  const [showForm, setShowForm] = useState(false);
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
  const [formErrors, setFormErrors] = useState({
    qualification_type: "",
    course_name: "",
    course_type: "",
    stream: "",
    course_startDate: "",
    course_endDate: "",
    college_name: "",
    university_name: "",
  });
  const [educationList, setEducationList] = useState([]);

  // For showing and hiding the form
  const handleAddClick = () => {
    setShowForm(true);
    setFormData({
      qualification_type: "Graduation",
      course_name: "CE",
      course_type: "Full Time",
      stream: "XYZ",
      course_startDate: "2024-03-15",
      course_endDate: "2024-03-30",
      college_name: "AIET",
      university_name: "GTU",
    });
  };

  // For onchange property
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

  // for Education form for adding the main form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handling the errors
    let errors = {};

    // Validate each form field
    if (!formData.qualification_type) {
      errors.qualification_type = "Qualification Type is required";
    }
    if (!formData.course_name) {
      errors.course_name = "Course Name is required";
    }
    if (!formData.course_type) {
      errors.course_type = "Course Type is required";
    }
    if (!formData.stream) {
      errors.stream = "Stream is required";
    }
    if (!formData.course_startDate) {
      errors.course_startDate = "Course Start Date is required";
    }
    if (!formData.course_endDate) {
      errors.course_endDate = "Course End Date is required";
    }
    if (!formData.college_name) {
      errors.college_name = "College Name is required";
    }
    if (!formData.university_name) {
      errors.university_name = "University Name is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Add the current form data to the educationList
    setEducationList([...educationList, formData]);

    // Reset the form data
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
    setFormErrors({});
    // If all things work fine then setting the form back to false
    setShowForm(false);
  };

  // For deleting the form entry entered
  const handleDeleteClick = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  // for editing the form and submit the data through this
  const handleSaveEdit = (index, updatedData) => {
    const updatedEducationList = educationList.map((item, i) => {
      if (i === index) {
        return updatedData;
      }
      return item;
    });
    setEducationList(updatedEducationList);
  };

  // for canceling the form
  const handleCancel = () => {
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
  };

  return (
    <>
      <div className="col-md-12">
        <ProfileField title={"Education"}>
          <>
            {!showForm ? (
              <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  color="white"
                  style={{ paddingRight: "10px" }}
                />
                Add
              </button>
            ) : (
              <EducationForm
                formData={formData}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            )}

            <div className="p-4 m-0">
              {educationList.length > 0 && (
                <>
                  {educationList.map((education, index) => (
                    <EducationItem
                      key={index}
                      education={education}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      valueIndex={index}
                      handleDeleteClick={() => handleDeleteClick(index)}
                      onSaveEdit={handleSaveEdit}
                      handleCancel={handleCancel}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        </ProfileField>
      </div>
    </>
  );
};

export default Education;
