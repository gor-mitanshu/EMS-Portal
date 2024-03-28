import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";

const Education = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    qualification_type: "Graduation",
    course_name: "CE",
    course_type: "Full Time",
    stream: "XYZ",
    course_startDate: "",
    course_endDate: "",
    college_name: "AIET",
    university_name: "GTU",
  });
  const [educationList, setEducationList] = useState([]);

  const handleAddClick = () => {
    setShowForm(true);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    // If all things work fine then setting the form back to false
    setShowForm(false);
  };

  const handleDeleteClick = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  const handleSaveEdit = (index, updatedData) => {
    const updatedEducationList = educationList.map((item, i) => {
      if (i === index) {
        return updatedData;
      }
      return item;
    });
    setEducationList(updatedEducationList);
  };
  const handleCancel = () => {
    setShowForm(false);
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
