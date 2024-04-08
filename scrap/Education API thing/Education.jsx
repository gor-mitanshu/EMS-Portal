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
  const [formErrors, setFormErrors] = useState({});
  const [educationList, setEducationList] = useState([]);

  const handleAddClick = () => {
    setShowForm(true);
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

  useEffect(() => {
    const getEducationDetails = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const accessTokenwithoutQuotes = JSON.parse(accessToken);
        const res = await axios.get(
          `${process.env.REACT_APP_API}/employee/geteducationdetails`,
          {
            headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
          }
        );
        setEducationList(res.data.educationDetails);
      } catch (error) {
        console.error("Error getting education details:", error);
      }
    };
    getEducationDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setEducationList([...educationList, res.data.newQualification]);
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
    } catch (error) {
      console.error("Error adding education details:", error);
    }
  };

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

  const handleSaveEdit = async (index, updatedData) => {
    console.log(updatedData);
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
      const updatedEducationList = educationList.map((item, i) => {
        if (i === index) {
          console.log(res);
          return res.data.updatedQualification;
        }
        return item;
      });
      setEducationList(updatedEducationList);
    } catch (error) {
      console.error("Error updating education details:", error);
    }
  };

  const handleCancel = () => {
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
                  {educationList[0].qualifications.map((education, index) => (
                    <EducationItem
                      key={index}
                      education={education}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      index={index}
                      handleDeleteClick={() =>
                        handleDeleteClick(index, education.education_id)
                      }
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
