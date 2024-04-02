import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import BasicInfoForm from "./BasicInfo/BasicInfoForm";
import BasicInfo from "./BasicInfo/BasicInfo";
import WorkInfoForm from "./WorkInfo/WorkInfoForm";
import WorkInfo from "./WorkInfo/WorkInfo";
import ResignationInfoForm from "./ResignationInfo/ResignationInfoForm";
import ResignationInfo from "./ResignationInfo/ResignationInfo";

const Work = () => {
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    workInfo: false,
    resignationInfo: false,
  });

  const [formData, setFormData] = useState({
    employee_id: "",
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

  const [formErrors, setFormErrors] = useState({
    employee_id: "",
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
    if (section === "basicInfo") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        employee_id: "",
        date_of_joining: "",
        probation_period: "",
        employment_type: "",
        work_location: "",
        employee_status: "",
        work_experience: "",
      }));
    }
    if (section === "workInfo") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        designation: "",
        job_title: "",
        department: "",
        sub_department: "",
      }));
    }
    if (section === "resignationInfo") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        resignation_date: "",
        resignation_status: "",
        notice_period: "",
        last_working_day: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (editMode.basicInfo) {
      if (!formData.employee_id.trim()) {
        errors.employee_id = "Employee Id is required";
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
      // Add your submit logic here
      setEditMode(false);
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-7">
              <ProfileField
                title="Basic Info"
                editMode={editMode.basicInfo}
                handleEditClick={() => handleEditClick("basicInfo")}
                handleCancelClick={() => handleCancelClick("basicInfo")}
              >
                {editMode.basicInfo ? (
                  <>
                    <BasicInfoForm
                      formData={formData}
                      formErrors={formErrors}
                      handleInputChange={handleInputChange}
                      editMode={editMode}
                    />
                  </>
                ) : (
                  <>
                    <BasicInfo formData={formData} />
                  </>
                )}
              </ProfileField>
            </div>
            {/* Card 2 */}
            <div className="col-md-5">
              <ProfileField
                title="Work Info"
                editMode={editMode.workInfo}
                handleEditClick={() => handleEditClick("workInfo")}
                handleCancelClick={() => handleCancelClick("workInfo")}
              >
                {editMode.workInfo ? (
                  <>
                    <WorkInfoForm
                      formData={formData}
                      formErrors={formErrors}
                      handleInputChange={handleInputChange}
                      editMode={editMode}
                    />
                  </>
                ) : (
                  <WorkInfo />
                )}
              </ProfileField>
            </div>
          </div>
          {/* Card 3 */}
          <div className="row">
            <div className="col-md-12">
              <ProfileField title="Work History">
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
                          <strong>Designation</strong>{" "}
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
              </ProfileField>
            </div>
          </div>
          {/* Card 4 */}
          <div className="row">
            <div className="col-md-12">
              <ProfileField
                title="Resignation Info"
                editMode={editMode.resignationInfo}
                handleEditClick={() => handleEditClick("resignationInfo")}
                handleCancelClick={() => handleCancelClick("resignationInfo")}
              >
                {editMode.resignationInfo ? (
                  <>
                    <ResignationInfoForm
                      formData={formData}
                      formErrors={formErrors}
                      handleInputChange={handleInputChange}
                    />
                  </>
                ) : (
                  <ResignationInfo formData={formData} />
                )}
              </ProfileField>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Work;
