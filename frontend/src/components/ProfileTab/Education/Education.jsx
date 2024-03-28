import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";

const Education = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [educationList, setEducationList] = useState([]);
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
    setEditIndex(index);
    setShowEditForm(true);
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
    setShowEditForm(false);
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
  console.log(showForm);
  return (
    <>
      <div className="col-md-12">
        <ProfileField title="Education">
          <>
            {(!showForm || !showEditForm) && (
              <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  color="white"
                  style={{ paddingRight: "10px" }}
                />
                Add
              </button>
            )}
            {(showForm || showEditForm) && (
              <EducationForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            )}
            {educationList.map((education, index) => {
              return (
                (!showEditForm || index === editIndex) && (
                  <EducationItem
                    key={index}
                    education={education}
                    onEditClick={() => handleEditClick(index)}
                    onDeleteClick={() => handleDeleteClick(index)}
                  />
                )
              );
            })}
          </>
        </ProfileField>
      </div>
    </>
  );
};

export default Education;
