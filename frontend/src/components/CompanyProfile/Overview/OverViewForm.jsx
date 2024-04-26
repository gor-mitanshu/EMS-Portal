import React from "react";

const OverViewForm = ({ formData, formErrors, handleInputChange }) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {/* Registered Company */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="register_company" className="font-weight-bold">
                  Registered Company:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Registered Company"
                  name="register_company"
                  value={formData.register_company}
                  onChange={handleInputChange}
                />
                {formErrors.register_company && (
                  <small className="text-danger">
                    {formErrors.register_company}
                  </small>
                )}
              </div>
            </div>
          </div>
          {/* Brand Name */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="brand_name" className="font-weight-bold">
                  Brand Name:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Brand Name"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleInputChange}
                />
                {formErrors.brand_name && (
                  <small className="text-danger">{formErrors.brand_name}</small>
                )}
              </div>
            </div>
          </div>
          {/* Company Official Email */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label
                  htmlFor="company_official_email"
                  className="font-weight-bold"
                >
                  Company Official Email:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Company's Offical Email"
                  name="company_official_email"
                  value={formData.company_official_email}
                  onChange={handleInputChange}
                />
                {formErrors.company_official_email && (
                  <small className="text-danger">
                    {formErrors.company_official_email}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Company Official Contact */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label
                  htmlFor="company_official_contact"
                  className="font-weight-bold"
                >
                  Company Official Contact:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Company's Official Contact"
                  name="company_official_contact"
                  value={formData.company_official_contact}
                  onChange={handleInputChange}
                />
                {formErrors.company_official_contact && (
                  <small className="text-danger">
                    {formErrors.company_official_contact}
                  </small>
                )}
              </div>
            </div>
          </div>
          {/* Website */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="website" className="font-weight-bold">
                  Website:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Registered Company"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
                {formErrors.website && (
                  <small className="text-danger">{formErrors.website}</small>
                )}
              </div>
            </div>
          </div>
          {/* Domain Name */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="domain_name" className="font-weight-bold">
                  Domain Name:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Registered Company"
                  name="domain_name"
                  value={formData.domain_name}
                  onChange={handleInputChange}
                />
                {formErrors.domain_name && (
                  <small className="text-danger">
                    {formErrors.domain_name}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Industry Type */}
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col mb-3">
                <label htmlFor="industry_type" className="font-weight-bold">
                  Industry Type:
                </label>
                <input
                  type="text"
                  className="form-control no-focus-box-shadow"
                  placeholder="Please Enter Industry Type"
                  name="industry_type"
                  value={formData.industry_type}
                  onChange={handleInputChange}
                />
                {formErrors.industry_type && (
                  <small className="text-danger">
                    {formErrors.industry_type}
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

export default OverViewForm;
