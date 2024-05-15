import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../../UI/card/Card";
import Swal from "sweetalert2";

const Education = ({ userId, accessToken }) => {
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
  const initialUser = useRef({
    qualification_type: "",
    course_name: "",
    course_type: "",
    course_stream: "",
    course_start_date: "",
    course_end_date: "",
    college_name: "",
    university_name: "",
  });
  // For showing and hiding the form
  const handleAddClick = () => {
    setShowForm(true);
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

  const getEducationDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/geteducationdetails/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setEducationList(res.data.educationData);
      setFormData(res.data.educationData);
      initialUser.current = res.data.educationData;
    } catch (error) {
      console.error("Error getting education details:", error);
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getEducationDetails();
  }, [getEducationDetails]);

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
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addEducationDetails/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res && res.status === 200) {
        toast.success(res.data.message)
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
    setShowForm(false);
  };
  const handleDeleteClick = async (index, id) => {
    try {
      Swal.fire({
        title: 'Confirm Delete',
        text: "Are you sure you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `${process.env.REACT_APP_API}/employee/deleteEducationDetails/${id}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (res) {
            toast.success(res.data.message);
            getEducationDetails();
          }
        } else {
          return;
        }
      })
    } catch (error) {
      console.error("Error deleting education details:", error);
    }
  };

  const handleSaveEdit = async (id, formData) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateEducationDetails/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
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
    if (hasChanges(formData)) {
      Swal.fire({
        title: "Are you sure?",
        text: "Changes will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Don't Save!",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowForm(false);
          setFormData(formData)
          setFormErrors({});
        }
      });
    } else {
      setShowForm(false);
      setFormData(formData)
      setFormErrors({});
    }
  };

  const hasChanges = (changedData) => {
    return (
      changedData.qualification_type !== initialUser.current.qualification_type ||
      changedData.course_name !== initialUser.current.course_name ||
      changedData.course_type !== initialUser.current.course_type ||
      changedData.course_stream !== initialUser.current.course_stream ||
      changedData.course_start_date !== initialUser.current.course_start_date ||
      changedData.course_end_date !== initialUser.current.course_end_date ||
      changedData.college_name !== initialUser.current.college_name ||
      changedData.university_name !== initialUser.current.university_name
    );
  };

  return (
    <>
      <div className="col-md-12">
        <Card title={ "Education" }>
          <>
            { !showForm ? (
              <button className="btn btn-primary mb-4" onClick={ handleAddClick }>
                <FontAwesomeIcon
                  icon={ faPlus }
                  size="sm"
                  color="white"
                  style={ { paddingRight: "10px" } }
                />
                Add
              </button>
            ) : (
              <EducationForm
                formData={ formData }
                formErrors={ formErrors }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit }
                handleCancel={ handleCancel }
              />
            ) }

            <div className="p-4 m-0">
              { educationList.length > 0 && (
                <>
                  { educationList.map(
                    (qualificationData, index) => (
                      <EducationItem
                        key={ index }
                        education={ qualificationData }
                        formErrors={ formErrors }
                        setFormErrors={ setFormErrors }
                        index={ index }
                        id={ qualificationData._id }
                        handleDeleteClick={ () =>
                          handleDeleteClick(index, qualificationData._id)
                        }
                        onSaveEdit={ handleSaveEdit }
                        handleCancel={ handleCancel }
                        hasChanges={ hasChanges }
                      />
                    )
                  ) }
                </>
              ) }
            </div>
          </>
        </Card>
      </div>
    </>
  );
};

export default Education;
