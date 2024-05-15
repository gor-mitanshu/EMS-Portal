import React from "react";

const OverViewForm = ({ formData, formErrors, handleInputChange, handleCancelClick }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.company_name ? 'error-form-input' : ''}` }>
            <label htmlFor="company_name" className="mb-1 fw-medium">
              Registered Company
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Registered Company"
              name="company_name"
              value={ formData.company_name }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.company_name }</div>
        </div>

        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.brand_name ? 'error-form-input' : ''}` }>
            <label htmlFor="brand_name" className="fw-medium mb-1">
              Brand Name
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Brand Name"
              name="brand_name"
              value={ formData.brand_name }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.brand_name }</div>
        </div>

        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.company_official_email ? 'error-form-input' : ''}` }>
            <label htmlFor="company_official_email" className="fw-medium mb-1">
              Company Official Email
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Company's Offical Email"
              name="company_official_email"
              value={ formData.company_official_email }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.company_official_email }</div>
        </div>

        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.company_official_contact ? 'error-form-input' : ''}` }>
            <label htmlFor="company_official_contact" className="fw-medium mb-1">
              Company Official Contact
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Company's Official Contact"
              name="company_official_contact"
              value={ formData.company_official_contact }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.company_official_contact }</div>
        </div>

        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.website ? 'error-form-input' : ''}` }>
            <label htmlFor="website" className="fw-medium mb-1">
              Website
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Registered Company"
              name="website"
              value={ formData.website }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.website }</div>
        </div>

        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.domain_name ? 'error-form-input' : ''}` }>
            <label htmlFor="domain_name" className="fw-medium mb-1">
              Domain Name:
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Registered Company"
              name="domain_name"
              value={ formData.domain_name }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.domain_name }</div>
        </div>

        <div className="col-md-4">
          <div className={ `form-input-wrapper px-0 ${formErrors.industry_type ? 'error-form-input' : ''}` }>
            <label htmlFor="industry_type" className="fw-medium mb-1">
              Industry Type:
            </label>
            <input
              type="text"
              className="form-input px-2"
              placeholder="Please Enter Industry Type"
              name="industry_type"
              value={ formData.industry_type }
              onChange={ handleInputChange }
            />
          </div>
          <div className="input-error">{ formErrors.industry_type }</div>
        </div>
      </div >
      <button type="button" className="btn btn-danger me-2" onClick={ handleCancelClick }>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary ">
        Save
      </button>
    </>
  );
};

export default OverViewForm;
