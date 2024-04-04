import React from "react";

const WorkInfo = ({ formData }) => {
  console.log(formData);
  return (
    <>
      <div className="user-details">
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Designation:</strong>
              {formData.designation || ""}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Job Title:</strong> {formData.job_title || ""}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Department:</strong> {formData.department || ""}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Sub Department:</strong> {formData.sub_department || ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkInfo;
