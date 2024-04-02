import React from "react";

const ResignationInfo = ({ formData }) => {
  console.log(formData);
  return (
    <>
      <div className="user-details">
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Resignation Date:</strong> -
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Resignation Status:</strong> -
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Notice Period:</strong> -
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Last Working Day:</strong> -
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResignationInfo;
