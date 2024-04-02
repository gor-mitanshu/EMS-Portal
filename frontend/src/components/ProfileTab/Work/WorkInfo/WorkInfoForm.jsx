import React from "react";

const WorkInfo = ({ formData, handleInputChange, formErrors, editMode }) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {/* Designation */}
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="designation" className="font-weight-bold">
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
                <label htmlFor="job_title" className="font-weight-bold">
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
                  <small className="text-danger">{formErrors.job_title}</small>
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
                <label htmlFor="department" className="font-weight-bold">
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
                  <small className="text-danger">{formErrors.department}</small>
                )}
              </div>
            </div>
          </div>
          {/* Sub Department */}
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="sub_department" className="font-weight-bold">
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
  );
};

export default WorkInfo;
