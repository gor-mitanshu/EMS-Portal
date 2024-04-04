import React from "react";

const BasicInfo = ({ formData }) => {
  return (
    <>
      <div className="user-details">
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Employee ID:</strong> {formData.employee_code}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Date of Joining:</strong> {formData.date_of_joining}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Probation Period:</strong> {formData.probation_period}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Employee Type:</strong> {formData.employment_type}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Work Location:</strong> {formData.work_location}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Employee Status:</strong> {formData.employee_status}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Work Experience:</strong> {formData.work_experience}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
