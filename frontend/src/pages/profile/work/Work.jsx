import React, { useEffect, useState } from "react";
import BasicInfoForm from "./BasicInfo/BasicInfoForm";
import WorkInfoForm from "./WorkInfo/WorkInfoForm";
import ResignationInfoForm from "./ResignationInfo/ResignationInfoForm";
import axios from "axios";
import Card from "../../../UI/profileCards/ProfileCard";

const Work = () => {
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    workInfo: false,
    resignationInfo: false,
  });

  const [formData, setFormData] = useState({
    employee_code: "",
    date_of_joining: "",
    probation_period: "",
    employment_type: "",
    work_location: "",
    employee_status: "",
    work_experience: "",

    designation: "",
    job_title: "",
    department: "",
    sub_department: "",

    resignation_date: "",
    resignation_status: "",
    notice_period: "",
    last_working_day: "",
  });
  const [employee, setEmployee] = useState({})
  const [formErrors, setFormErrors] = useState({
    employee_code: "",
    date_of_joining: "",
    probation_period: "",
    employment_type: "",
    work_location: "",
    employee_status: "",
    work_experience: "",

    designation: "",
    job_title: "",
    department: "",
    sub_department: "",

    resignation_date: "",
    resignation_status: "",
    notice_period: "",
    last_working_day: "",
  });

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

  const handleEditClick = (section) => {
    setEditMode({
      ...editMode,
      [section]: true,
    });
  };

  const handleCancelClick = (section) => {
    setEditMode({
      ...editMode,
      [section]: false,
    });

    // Reset validation errors for all fields in the specific card
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      ...(section === "basicInfo" && {
        employee_code: "",
        date_of_joining: "",
        probation_period: "",
        employment_type: "",
        work_location: "",
        employee_status: "",
        work_experience: "",
      }),
      ...(section === "workInfo" && {
        designation: "",
        job_title: "",
        department: "",
        sub_department: "",
      }),
      ...(section === "resignationInfo" && {
        resignation_date: "",
        resignation_status: "",
        notice_period: "",
        last_working_day: "",
      }),
    }));
  };

  useEffect(() => {
    const getWorkData = async () => {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/employee/getWorkDetails`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res && res.status === 200) {
        console.log(res)
        const { workDetails } = res.data;
        setFormData(workDetails);
        setEmployee(workDetails)
      }
    };
    getWorkData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (editMode.basicInfo) {
      if (!formData.employee_code.trim()) {
        errors.employee_code = "Employee Id is required";
      }
      if (!formData.employment_type.trim()) {
        errors.employment_type = "Employment Type is required";
      }
      if (!formData.date_of_joining) {
        errors.date_of_joining = "Date of Joining is required";
      }
      if (!formData.work_location) {
        errors.work_location = "Work Location is required";
      }
      if (!formData.work_experience.trim()) {
        errors.work_experience = "Work Experience is required";
      }
      if (!formData.probation_period.trim()) {
        errors.probation_period = "Probation Period is required";
      }
    }
    // Work Info Section
    if (editMode.workInfo) {
      if (!formData.designation.trim()) {
        errors.designation = "Designation is required";
      }
      if (!formData.job_title.trim()) {
        errors.job_title = "Job Title is required";
      }
      if (!formData.department.trim()) {
        errors.department = "Department is required";
      }
      if (!formData.sub_department.trim()) {
        errors.sub_department = "Sub-Department is required";
      }
    }
    // Address Section
    if (editMode.resignationInfo) {
      if (!formData.resignation_date) {
        errors.resignation_date = "Resignation Info is required";
      }
      if (!formData.resignation_status) {
        errors.resignation_status = "Resignation Status is required";
      }
      if (!formData.notice_period) {
        errors.notice_period = "Notice Period is required";
      }
      if (!formData.last_working_day) {
        errors.last_working_day = "Last Working Day is required";
      }
    }

    setFormErrors(errors);
    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      try {
        const accessToken = localStorage.getItem("token");
        const accessTokenwithoutQuotes = JSON.parse(accessToken);
        const { user } = JSON.parse(
          atob(accessTokenwithoutQuotes.split(".")[1])
        );

        if (accessToken) {
          await axios.put(
            `${process.env.REACT_APP_API}/employee/updateWorkDetails/${user._id}`,
            formData,
            {
              headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
            }
          );
          console.log(formData);
          // alert("Form submitted successfully!");
          setEditMode({
            basicInfo: false,
            workInfo: false,
            resignationInfo: false,
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <>
      <div>
        <form onSubmit={ handleSubmit }>
          <div className="row">
            {/* Card 1 */ }
            <div className="col-md-7">
              <Card
                title="Basic Info"
                editMode={ editMode.basicInfo }
                handleEditClick={ () => handleEditClick("basicInfo") }
                handleCancelClick={ () => handleCancelClick("basicInfo") }
              >
                { editMode.basicInfo ? (
                  <>
                    <BasicInfoForm
                      formData={ formData }
                      formErrors={ formErrors }
                      handleInputChange={ handleInputChange }
                      editMode={ editMode }
                    />
                  </>
                ) : (
                  <>
                    <div className="user-details">
                      <div className="row">
                        { employee ?
                          <>
                            <div className="col-md-4">
                              <p>
                                <strong>Employee ID:</strong>{ " " }
                                { employee.employee_code || "" }
                              </p>
                            </div><div className="col-md-4">
                              <p>
                                <strong>Date of Joining:</strong>{ " " }
                                { employee.date_of_joining && employee.date_of_joining }
                              </p>
                            </div><div className="col-md-4">
                              <p>
                                <strong>Probation Period:</strong>{ " " }
                                { employee.probation_period && employee.probation_period }
                              </p>
                            </div>
                          </> : "No data found"
                        }
                      </div>
                      <div className="row">
                        {
                          employee ?
                            <>
                              <div className="col-md-4">
                                <p>
                                  <strong>Employee Type:</strong>{ " " }
                                  { employee.employment_type && employee.employment_type }
                                </p>
                              </div>
                              <div className="col-md-4">
                                <p>
                                  <strong>Work Location:</strong>{ " " }
                                  { employee.work_location && employee.work_location }
                                </p>
                              </div>
                              <div className="col-md-4">
                                <p>
                                  <strong>Employee Status:</strong>{ " " }
                                  { employee.employee_status && employee.employee_status }
                                </p>
                              </div>
                            </> : "No data found"
                        }

                      </div>
                      <div className="row">
                        {
                          employee ?

                            <div className="col-md-6">
                              <p>
                                <strong>Work Experience:</strong>{ " " }
                                { employee.work_experience && employee.work_experience }
                              </p>
                            </div> : "No data found"

                        }
                      </div>
                    </div>
                  </>
                ) }
              </Card>
            </div>
            {/* Card 2 */ }
            <div className="col-md-5">
              <Card
                title="Work Info"
                editMode={ editMode.workInfo }
                handleEditClick={ () => handleEditClick("workInfo") }
                handleCancelClick={ () => handleCancelClick("workInfo") }
              >
                { editMode.workInfo ? (
                  <>
                    <WorkInfoForm
                      formData={ formData }
                      formErrors={ formErrors }
                      handleInputChange={ handleInputChange }
                      editMode={ editMode }
                    />
                  </>
                ) : (
                  <div className="user-details">
                    <div className="row">
                      {
                        employee ?
                          <>
                            <div className="col-md-6">
                              <p>
                                <strong>Designation:</strong>
                                { employee.designation || "" }
                              </p>
                            </div><div className="col-md-6">
                              <p>
                                <strong>Job Title:</strong> { employee.job_title || "" }
                              </p>
                            </div>
                          </> : "No data found"
                      }
                    </div>
                    <div className="row">
                      { employee ?
                        <>
                          <div className="col-md-6">
                            <p>
                              <strong>Department:</strong>{ " " }
                              { employee.department || "" }
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Sub Department:</strong>{ " " }
                              { employee.sub_department || "" }
                            </p>
                          </div>
                        </> : "NO data found" }
                    </div>
                  </div>
                ) }
              </Card>
            </div>
          </div>
          {/* Card 3 */ }
          <div className="row">
            <div className="col-md-12">
              <Card title="Work History">
                <>
                  <div className="user-details">
                    <div className="row">
                      <div className="col-md-3">
                        <p>
                          <strong>Department</strong>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p>
                          <strong>Designation</strong>{ " " }
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p>
                          <strong>From</strong>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p>
                          <strong>To</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              </Card>
            </div>
          </div>
          {/* Card 4 */ }
          <div className="row">
            <div className="col-md-12">
              <Card
                title="Resignation Info"
                editMode={ editMode.resignationInfo }
                handleEditClick={ () => handleEditClick("resignationInfo") }
                handleCancelClick={ () => handleCancelClick("resignationInfo") }
              >
                { editMode.resignationInfo ? (
                  <>
                    <ResignationInfoForm
                      formData={ formData }
                      formErrors={ formErrors }
                      handleInputChange={ handleInputChange }
                    />
                  </>
                ) : (
                  <div className="user-details">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Resignation Date:</strong> -
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Resignation Status:</strong> -
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Notice Period:</strong> -
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Last Working Day:</strong> -
                        </p>
                      </div>
                    </div>
                  </div>
                ) }
              </Card>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Work;
