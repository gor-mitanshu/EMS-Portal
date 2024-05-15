import React from "react";

const initialFormData = {
  employee_code: "",
  employment_type: "",
  date_of_joining: "",
  work_location: "",
  work_experience: "",
  probation_period: "",
};
const BasicInfoForm = ({
  formData = initialFormData,
  formErrors,
  handleInputChange,
  handleCancel,
  hasChanges
}) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {/* Employee ID */ }
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="employee_code" className="font-weight-bold">
                  Employee ID:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Employee ID"
                  name="employee_code"
                  value={ formData.employee_code }
                  onChange={ handleInputChange }
                />
                { formErrors.employee_code && (
                  <small className="text-danger">
                    { formErrors.employee_code }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Employee Select */ }
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="employee_type" className="font-weight-bold">
                  Employee Type:
                </label>
                <select
                  className="form-select no-focus-box-shadow"
                  name="employment_type"
                  value={ formData.employment_type }
                  onChange={ handleInputChange }
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="On Contract">On Contract</option>
                  <option value="Intern">Intern</option>
                </select>
                { formErrors.employment_type && (
                  <small className="text-danger">
                    { formErrors.employment_type }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Date of Joining */ }
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="date_of_joining" className="font-weight-bold">
                  Date of Joining:
                </label>
                <input
                  type="date"
                  className="form-control no-focus-box-shadow"
                  placeholder="Date of Joining"
                  name="date_of_joining"
                  value={ formData.date_of_joining || "" }
                  onChange={ handleInputChange }
                />
                { formErrors.date_of_joining && (
                  <small className="text-danger">
                    { formErrors.date_of_joining }
                  </small>
                ) }
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Work Location */ }
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="employee_type" className="font-weight-bold">
                  Work Location:
                </label>
                <select
                  className="form-select no-focus-box-shadow"
                  name="work_location"
                  value={ formData.work_location }
                  onChange={ handleInputChange }
                >
                  <option value="">Select Work Location</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
                { formErrors.work_location && (
                  <small className="text-danger">
                    { formErrors.work_location }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Work Experience */ }
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="work_experience" className="font-weight-bold">
                  Work Experience:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Experience in months"
                  name="work_experience"
                  value={ formData.work_experience || "" }
                  onChange={ handleInputChange }
                />
                { formErrors.work_experience && (
                  <small className="text-danger">
                    { formErrors.work_experience }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Date of Joining */ }
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="probation_period" className="font-weight-bold">
                  Probation Period:
                </label>
                <input
                  type="number"
                  className="form-control no-focus-box-shadow"
                  placeholder="Date of Joining"
                  name="probation_period"
                  value={ formData.probation_period }
                  onChange={ handleInputChange }
                />
                { formErrors.probation_period && (
                  <small className="text-danger">
                    { formErrors.probation_period }
                  </small>
                ) }
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-danger me-2" onClick={ handleCancel }>
          Cancel
        </button>

        <button type="submit" className="btn btn-primary mr-2">
          Save
        </button>
      </div>
    </>
  );
};

export default BasicInfoForm;
