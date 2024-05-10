import React, { useCallback, useEffect, useState } from "react";
import BasicInfoForm from "./BasicInfo/BasicInfoForm";
import WorkInfoForm from "./WorkInfo/WorkInfoForm";
import ResignationInfoForm from "./ResignationInfo/ResignationInfoForm";
import axios from "axios";
import Card from "../../../UI/profileCards/ProfileCard";
import { toast } from "react-toastify";

const initialState = {
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
}
const Work = ({ accessToken, userId }) => {
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    workInfo: false,
    resignationInfo: false,
  });

  const [formData, setFormData] = useState(initialState);
  const [employee, setEmployee] = useState({})
  const [formErrors, setFormErrors] = useState(initialState);

  // Handle Change
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

  // Handle Edit Click
  const handleEditClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: true,
    }));
  };

  //Handle Cancel Click
  const handleCancelClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: false,
    }));

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

  const getWorkData = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/getWorkDetails/${userId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (res && res.status === 200) {
      const { workDetails } = res.data;
      setFormData(workDetails);
      setEmployee(workDetails)
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getWorkData();
  }, [getWorkData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (editMode.basicInfo) {
      if (!formData.employee_code) {
        errors.employee_code = "Employee Id is required";
      }
      if (!formData.employment_type) {
        errors.employment_type = "Employment Type is required";
      }
      if (!formData.date_of_joining) {
        errors.date_of_joining = "Date of Joining is required";
      }
      if (!formData.work_location) {
        errors.work_location = "Work Location is required";
      }
      if (!formData.work_experience) {
        errors.work_experience = "Work Experience is required";
      }
      if (!formData.probation_period) {
        errors.probation_period = "Probation Period is required";
      }
    }
    // Work Info Section
    if (editMode.workInfo) {
      if (!formData.designation) {
        errors.designation = "Designation is required";
      }
      if (!formData.job_title) {
        errors.job_title = "Job Title is required";
      }
      if (!formData.department) {
        errors.department = "Department is required";
      }
      if (!formData.sub_department) {
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
        if (!!employee) {
          const res = await axios.put(`${process.env.REACT_APP_API}/employee/updateWorkDetails/${employee._id}`,
            formData,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          if (res) {
            toast.success(res.data.message);
            getWorkData();
            setEditMode({
              basicInfo: false,
              workInfo: false,
              resignationInfo: false,
            });
          }
        } else {
          const res = await axios.post(`${process.env.REACT_APP_API}/employee/addWorkDetails/${userId}`, formData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          if (res) {
            toast.success(res.data.message)
            getWorkData();
            setEditMode({
              basicInfo: false,
              workInfo: false,
              resignationInfo: false,
            });
          }
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
                    />
                  </>
                ) : (
                  <>
                    <div className="user-details">
                      { employee ?
                        <>
                          <div className="row">
                            <div className="col-md-4">
                              <p>
                                <strong>Employee ID:</strong>
                                { employee.employee_code || "" }
                              </p>
                            </div>

                            <div className="col-md-4">
                              <p>
                                <strong>Date of Joining:</strong>
                                { employee.date_of_joining || "" }
                              </p>
                            </div>

                            <div className="col-md-4">
                              <p>
                                <strong>Probation Period:</strong>
                                { employee.probation_period || "" }
                              </p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4">
                              <p>
                                <strong>Employee Type:</strong>
                                { employee.employment_type || "" }
                              </p>
                            </div>

                            <div className="col-md-4">
                              <p>
                                <strong>Work Location:</strong>
                                { employee.work_location || "" }
                              </p>
                            </div>

                            <div className="col-md-4">
                              <p>
                                <strong>Employee Status:</strong>
                                { employee.employee_status || "" }
                              </p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <p>
                                <strong>Work Experience:</strong>
                                { employee.work_experience || "" }
                              </p>
                            </div>
                          </div>
                        </> : <h3>No Data Found</h3>
                      }
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
                    />
                  </>
                ) : (
                  <div className="user-details">
                    { employee ?
                      <>
                        <div className="row">
                          <div className="col-md-6">
                            <p>
                              <strong>Designation:</strong>
                              { employee.designation || "" }
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Job Title:</strong> { employee.job_title || "" }
                            </p>
                          </div>
                        </div><div className="row">
                          <div className="col-md-6">
                            <p>
                              <strong>Department:</strong>
                              { employee.department || "" }
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Sub Department:</strong>
                              { employee.sub_department || "" }
                            </p>
                          </div>
                        </div>
                      </> :
                      <h3>No Data Found</h3>
                    }

                  </div>
                ) }
              </Card>
            </div>
          </div >

          {/* Card 3 */ }
          < div className="row" >
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
                          <strong>Designation</strong>
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
          </div >

          {/* Card 4 */ }
          <div div className="row" >
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
                    { employee ?

                      <>
                        <div className="row">
                          <div className="col-md-6">
                            <p>
                              <strong>Resignation Date:</strong> { formData.resignation_date || "" }
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Resignation Status:</strong> { formData.resignation_status || "" }
                            </p>
                          </div>
                        </div><div className="row">
                          <div className="col-md-6">
                            <p>
                              <strong>Notice Period:</strong> { formData.notice_period || "" }
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Last Working Day:</strong> { formData.last_working_day || "" }
                            </p>
                          </div>
                        </div>
                      </> : <h3>
                        No data found</h3>
                    }
                  </div>
                ) }
              </Card>
            </div>
          </div >
        </form >
      </div >
    </>
  );
};

export default Work;
