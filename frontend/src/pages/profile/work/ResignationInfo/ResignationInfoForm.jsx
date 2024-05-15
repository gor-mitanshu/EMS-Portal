import React from "react";

const initialFormData = {
  resignation_date: "",
  resignation_status: "",
  notice_period: "",
  last_working_day: "",
};
const ResignationInfoForm = ({ formData = initialFormData, formErrors, handleInputChange, handleCancel }) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {/* Resignation Date */ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="resignation_date" className="font-weight-bold">
                  Resignation Date:
                </label>
                <input
                  type="date"
                  className="form-control no-focus-box-shadow"
                  placeholder="Resignation Date"
                  name="resignation_date"
                  value={ formData.resignation_date }
                  onChange={ handleInputChange }
                />
                { formErrors.resignation_date && (
                  <small className="text-danger">
                    { formErrors.resignation_date }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Resignation Status*/ }
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
                  value={ formData.resignation_status }
                  onChange={ handleInputChange }
                />
                { formErrors.resignation_status && (
                  <small className="text-danger">
                    { formErrors.resignation_status }
                  </small>
                ) }
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Notice Period */ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="notice_period" className="font-weight-bold">
                  Notice Period:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Notice Period"
                  name="notice_period"
                  value={ formData.notice_period }
                  onChange={ handleInputChange }
                />
                { formErrors.notice_period && (
                  <small className="text-danger">
                    { formErrors.notice_period }
                  </small>
                ) }
              </div>
            </div>
          </div>
          {/* Last Working Day*/ }
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="last_working_day" className="font-weight-bold">
                  Last Working Day:
                </label>
                <input
                  type="date"
                  className="form-control no-focus-box-shadow"
                  placeholder="Last Working Day"
                  name="last_working_day"
                  value={ formData.last_working_day }
                  onChange={ handleInputChange }
                />
                { formErrors.last_working_day && (
                  <small className="text-danger">
                    { formErrors.last_working_day }
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

export default ResignationInfoForm;
