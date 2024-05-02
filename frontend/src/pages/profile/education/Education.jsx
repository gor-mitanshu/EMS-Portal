import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../../UI/profileCards/ProfileCard";

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
    // setFormData({
    //   qualification_type: "Graduation",
    //   course_name: "CE",
    //   course_type: "Full Time",
    //   course_stream: "XYZ",
    //   course_start_date: "2024-03-15",
    //   course_end_date: "2024-03-30",
    //   college_name: "AIET",
    //   university_name: "GTU",
    // });
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
  useEffect(() => {
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
        // console.log(res);
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
        getEducationDetails();
      }
    } catch (error) {
      console.error("Error adding education details:", error);
    }

    // Reset the form data
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
    // If all things work fine then setting the form back to false
    setShowForm(false);
  };
  const handleDeleteClick = async (index, id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenWithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deletequalification/${id}`,
        {
          headers: { Authorization: `Bearer ${accessTokenWithoutQuotes}` },
        }
      );
      if (res) {
        console.log(res);
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
        toast.success(res.data.message);
        getEducationDetails();
      }
    } catch (error) {
      console.error("Error deleting education details:", error);
    }
  };

  const handleSaveEdit = async (id, formData) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateeducationdetails/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res && res.status === 200) {
        console.log(res);
        const updatedList = educationList.map((item) =>
          item.id === id ? { ...item, ...formData } : item
        );
        setEducationList(updatedList);
        toast.success(res.data.message);
        getEducationDetails();
      }
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
        <Card title={"Education"}>
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
                  {educationList[0].qualifications.map(
                    (qualificationData, index) => (
                      <EducationItem
                        key={index}
                        education={qualificationData}
                        formErrors={formErrors}
                        setFormErrors={setFormErrors}
                        index={index}
                        id={qualificationData._id}
                        handleDeleteClick={() =>
                          handleDeleteClick(index, qualificationData._id)
                        }
                        onSaveEdit={handleSaveEdit}
                        handleCancel={handleCancel}
                      />
                    )
                  )}
                </>
              )}
            </div>
          </>
        </Card>
      </div>
    </>
  );
};

export default Education;
