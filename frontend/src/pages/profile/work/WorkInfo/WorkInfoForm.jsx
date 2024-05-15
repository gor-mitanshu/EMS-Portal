import React from "react";

const initialFormData = {
  designation: "",
  job_title: "",
  department: "",
  sub_department: "",
};
const WorkInfo = ({ formData = initialFormData, handleInputChange, formErrors, handleCancel }) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {/* Designation */ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="designation" className="font-weight-bold">
                  Designation:
                </label>
                <select
                  className="form-select no-focus-box-shadow"
                  name="designation"
                  value={ formData.designation }
                  onChange={ handleInputChange }
                >
                  <option value="">Select Designation</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                </select>
                { formErrors.designation && (
                  <small className="text-danger">
                    { formErrors.designation }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Job Title*/ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="job_title" className="font-weight-bold">
                  Job Title:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Designation"
                  name="job_title"
                  value={ formData.job_title }
                  onChange={ handleInputChange }
                />
                { formErrors.job_title && (
                  <small className="text-danger">{ formErrors.job_title }</small>
                ) }
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Department */ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="department" className="font-weight-bold">
                  Department:
                </label>
                <select
                  className="form-select no-focus-box-shadow"
                  name="department"
                  value={ formData.department }
                  onChange={ handleInputChange }
                >
                  <option value="">Select Department</option>
                  <option value="Computer">Computer</option>
                </select>
                { formErrors.department && (
                  <small className="text-danger">{ formErrors.department }</small>
                ) }
              </div>
            </div>
          </div>
          {/* Sub Department */ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="sub_department" className="font-weight-bold">
                  Sub Department:
                </label>
                <select
                  className="form-select no-focus-box-shadow"
                  name="sub_department"
                  value={ formData.sub_department }
                  onChange={ handleInputChange }
                >
                  <option value="">Select Sub-Department</option>
                  <option value="IT">IT</option>
                </select>
                { formErrors.sub_department && (
                  <small className="text-danger">
                    { formErrors.sub_department }
                  </small>
                ) }
              </div>
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-danger me-2" onClick={ handleCancel }>
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </>
  );
};

export default WorkInfo;
