import React from "react";

const OverViewItem = ({ formData }) => {
  return (
    <>
      <div className="user-details">
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Registered Company Name:</strong>{" "}
              {formData.register_company}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Brand Name:</strong> {formData.brand_name}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Company Official Email:</strong>{" "}
              {formData.company_official_email}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Company Official Contact:</strong>{" "}
              {formData.company_official_contact}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Website:</strong> {formData.website}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Domain Name:</strong> {formData.domain_name}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Industry Type:</strong> {formData.industry_type}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverViewItem;
