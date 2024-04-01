import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";

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
            <div className="col-md-8">
              <ProfileField
                title="Basic Info"
                editMode={editMode.basicInfo}
                handleEditClick={() => handleEditClick("basicInfo")}
                handleCancelClick={() => handleCancelClick("basicInfo")}
              >
                {editMode.basicInfo ? (
                  <>
                    <div className="form-group">
                      <div className="row">
                        {/* Employee ID */}
                        <div className="col-md-4">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="employee-id"
                                className="font-weight-bold"
                              >
                                Employee ID:
                              </label>
                              <input
                                type="text"
                                className="form-control no-focus-box-shadow"
                                placeholder="Employee ID"
                                name="employee_id"
                                value={formData.employee_id}
                                onChange={handleInputChange}
                              />
                              {formErrors.employee_id && (
                                <small className="text-danger">
                                  {formErrors.employee_id}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Employee Select */}
                        <div className="col-md-4">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="employee_type"
                                className="font-weight-bold"
                              >
                                Employee Type:
                              </label>
                              <select
                                className="form-select no-focus-box-shadow"
                                name="employment_type"
                                value={formData.employment_type}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              >
                                <option value="">Select Employment Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="On Contract">On Contract</option>
                                <option value="Intern">Intern</option>
                              </select>
                              {formErrors.employment_type && (
                                <small className="text-danger">
                                  {formErrors.employment_type}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Date of Joining */}
                        <div className="col-md-4">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="date_of_joining"
                                className="font-weight-bold"
                              >
                                Date of Joining:
                              </label>
                              <input
                                type="date"
                                className="form-control no-focus-box-shadow"
                                placeholder="Date of Joining"
                                name="date_of_joining"
                                value={formData.date_of_joining}
                                onChange={handleInputChange}
                              />
                              {formErrors.date_of_joining && (
                                <small className="text-danger">
                                  {formErrors.date_of_joining}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Work Location */}
                        <div className="col-md-4">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="employee_type"
                                className="font-weight-bold"
                              >
                                Work Location:
                              </label>
                              <select
                                className="form-select no-focus-box-shadow"
                                name="work_location"
                                value={formData.work_location}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              >
                                <option value="">Select Work Location</option>
                              </select>
                              {formErrors.work_location && (
                                <small className="text-danger">
                                  {formErrors.work_location}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Work Experience */}
                        <div className="col-md-4">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="work_experience"
                                className="font-weight-bold"
                              >
                                Work Experience:
                              </label>
                              <input
                                type="text"
                                className="form-control no-focus-box-shadow"
                                placeholder="Experience in months"
                                name="work_experience"
                                value={formData.work_experience}
                                onChange={handleInputChange}
                              />
                              {formErrors.work_experience && (
                                <small className="text-danger">
                                  {formErrors.work_experience}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Date of Joining */}
                        <div className="col-md-4">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="probation_period"
                                className="font-weight-bold"
                              >
                                Probation Period:
                              </label>
                              <input
                                type="number"
                                className="form-control no-focus-box-shadow"
                                placeholder="Date of Joining"
                                name="probation_period"
                                value={formData.probation_period}
                                onChange={handleInputChange}
                              />
                              {formErrors.probation_period && (
                                <small className="text-danger">
                                  {formErrors.probation_period}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary mr-2">
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="user-details">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Employee ID:</strong> {formData.employee_id}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Date of Joining:</strong>{" "}
                            {formData.date_of_joining}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Probation Period:</strong>{" "}
                            {formData.probation_period}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Employee Type:</strong>{" "}
                            {formData.employment_type}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Work Location:</strong>{" "}
                            {formData.work_location}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Employee Status:</strong>{" "}
                            {formData.employee_status}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Work Experience:</strong>{" "}
                            {formData.work_experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </ProfileField>
            </div>
            {/* Card 2 */}
            <div className="col-md-4">
              <ProfileField
                title="Work Info"
                editMode={editMode.workInfo}
                handleEditClick={() => handleEditClick("workInfo")}
                handleCancelClick={() => handleCancelClick("workInfo")}
              >
                {editMode.workInfo ? (
                  <>
                    <div className="form-group">
                      <div className="row">
                        {/* Designation */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="designation"
                                className="font-weight-bold"
                              >
                                Designation:
                              </label>
                              <select
                                className="form-select no-focus-box-shadow"
                                name="designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              >
                                <option value="">Select Designation</option>
                              </select>
                              {formErrors.designation && (
                                <small className="text-danger">
                                  {formErrors.designation}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Job Title*/}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="job_title"
                                className="font-weight-bold"
                              >
                                Job Title:
                              </label>
                              <input
                                type="text"
                                className="form-control no-focus-box-shadow"
                                placeholder="Designation"
                                name="job_title"
                                value={formData.job_title}
                                onChange={handleInputChange}
                              />
                              {formErrors.job_title && (
                                <small className="text-danger">
                                  {formErrors.job_title}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Department */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="department"
                                className="font-weight-bold"
                              >
                                Department:
                              </label>
                              <select
                                className="form-select no-focus-box-shadow"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              >
                                <option value="">Select Department</option>
                              </select>
                              {formErrors.department && (
                                <small className="text-danger">
                                  {formErrors.department}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Sub Department */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-3">
                              <label
                                htmlFor="sub_department"
                                className="font-weight-bold"
                              >
                                Sub Department:
                              </label>
                              <select
                                className="form-select no-focus-box-shadow"
                                name="sub_department"
                                value={formData.sub_department}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              >
                                <option value="">Select Sub-Department</option>
                              </select>
                              {formErrors.sub_department && (
                                <small className="text-danger">
                                  {formErrors.sub_department}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary mr-2">
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="user-details">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Designation:</strong> -
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Job Title:</strong> -
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Department:</strong> -
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Sub Department:</strong> -
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </ProfileField>
            </div>
            <div className="row">
              {/* Card 3 */}
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
                      <div className="form-group">
                        <div className="row">
                          {/* Resignation Date */}
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col mb-3">
                                <label
                                  htmlFor="resignation_date"
                                  className="font-weight-bold"
                                >
                                  Resignation Date:
                                </label>
                                <input
                                  type="date"
                                  className="form-control no-focus-box-shadow"
                                  placeholder="Resignation Date"
                                  name="resignation_date"
                                  value={formData.resignation_date}
                                  onChange={handleInputChange}
                                />
                                {formErrors.resignation_date && (
                                  <small className="text-danger">
                                    {formErrors.resignation_date}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Resignation Status*/}
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col mb-3">
                                <label
                                  htmlFor="resignation_status"
                                  className="font-weight-bold"
                                >
                                  Resignation Status:
                                </label>
                                <input
                                  type="text"
                                  className="form-control no-focus-box-shadow"
                                  placeholder="Resignation Status"
                                  name="resignation_status"
                                  value={formData.resignation_status}
                                  onChange={handleInputChange}
                                />
                                {formErrors.resignation_status && (
                                  <small className="text-danger">
                                    {formErrors.resignation_status}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/* Notice Period */}
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col mb-3">
                                <label
                                  htmlFor="notice_period"
                                  className="font-weight-bold"
                                >
                                  Notice Period:
                                </label>
                                <input
                                  type="text"
                                  className="form-control no-focus-box-shadow"
                                  placeholder="Notice Period"
                                  name="notice_period"
                                  value={formData.notice_period}
                                  onChange={handleInputChange}
                                />
                                {formErrors.notice_period && (
                                  <small className="text-danger">
                                    {formErrors.notice_period}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Last Working Day*/}
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col mb-3">
                                <label
                                  htmlFor="last_working_day"
                                  className="font-weight-bold"
                                >
                                  Last Working Day:
                                </label>
                                <input
                                  type="date"
                                  className="form-control no-focus-box-shadow"
                                  placeholder="Last Working Day"
                                  name="last_working_day"
                                  value={formData.last_working_day}
                                  onChange={handleInputChange}
                                />
                                {formErrors.last_working_day && (
                                  <small className="text-danger">
                                    {formErrors.last_working_day}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary mr-2">
                          Save
                        </button>
                      </div>
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
                  )}
                </ProfileField>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Work;
