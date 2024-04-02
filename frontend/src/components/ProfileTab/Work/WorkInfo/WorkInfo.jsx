import React from "react";

const WorkInfo = ({ formData }) => {
  console.log(formData);
  return (
    <>
      <div className="user-details">
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Designation:</strong> -
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Job Title:</strong> -
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Department:</strong> -
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Sub Department:</strong> -
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkInfo;
