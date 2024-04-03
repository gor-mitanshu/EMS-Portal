import React from "react";

const OverViewItem = ({ formData }) => {
  return (
    <>
      <div className="user-details">
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Registered Company Name:</strong> {formData.employee_id}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Brand Name:</strong> {formData.date_of_joining}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Company Official Email:</strong>{" "}
              {formData.probation_period}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Company Official Contact:</strong>{" "}
              {formData.employment_type}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Website:</strong> {formData.work_location}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Domain Name:</strong> {formData.employee_status}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Industry Type:</strong> {formData.work_experience}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverViewItem;
