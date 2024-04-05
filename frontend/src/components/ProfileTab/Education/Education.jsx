import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";
import axios from "axios";

const Education = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    qualification_type: "",
    course_name: "",
    course_type: "",
    course_stream: "",
    course_start_date: "",
    course_end_date: "",
    college_name: "",
    university_name: "",
  });
  const [formErrors, setFormErrors] = useState({
    qualification_type: "",
    course_name: "",
    course_type: "",
    course_stream: "",
    course_start_date: "",
    course_end_date: "",
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
      course_stream: "XYZ",
      course_start_date: "2024-03-15",
      course_end_date: "2024-03-30",
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

  useEffect(() => {
    const getEducationDetails = async () => {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/geteducationdetails`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      console.log(res);
    };
    getEducationDetails();
  }, []);

  // for Education form for adding the main form
  const handleSubmit = async (e) => {
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
    if (!formData.course_stream) {
      errors.stream = "Stream is required";
    }
    if (!formData.course_start_date) {
      errors.course_startDate = "Course Start Date is required";
    }
    if (!formData.course_end_date) {
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
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addeducationdetails`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res && res.status === 200) {
        setEducationList([...educationList, res.data.educationDetails]);
        setShowForm(false);
        setFormData({
          qualification_type: "",
          course_name: "",
          course_type: "",
          course_stream: "",
          course_start_date: "",
          course_end_date: "",
          college_name: "",
          university_name: "",
        });
        setFormErrors({});
      }
    } catch (error) {}

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
  const handleDeleteClick = async (index, educationId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenWithoutQuotes = JSON.parse(accessToken);
      await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteeducation/${educationId}`,
        {
          headers: { Authorization: `Bearer ${accessTokenWithoutQuotes}` },
        }
      );
      const updatedList = educationList.filter((_, i) => i !== index);
      setEducationList(updatedList);
    } catch (error) {
      console.error("Error deleting education details:", error);
    }
  };

  // for editing the form and submit the data through this
  const handleSaveEdit = async (index, updatedData) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateeducationdetails/${updatedData._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res && res.status === 200) {
        const updatedEducationList = educationList.map((item, i) => {
          if (i === index) {
            return res.data;
          }
          return item;
        });
        setEducationList(updatedEducationList);
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
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
                      education={education.educationDetails}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      valueIndex={index}
                      handleDeleteClick={() => handleDeleteClick(index)}
                      onSaveEdit={(updatedData) =>
                        handleSaveEdit(index, updatedData)
                      }
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
