import React from "react";
import User from "../../../../assets/user.jpg";

const PersonalProfile = ({ formData }) => {
  return (
    <>
      <div className="user-details d-flex justify-content-evenly align-items-center flex-wrap">
        <div className="pb-sm-3">
          <img
            src={User}
            alt="User"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div>
          <p>
            <strong>Name:</strong>{" "}
            {formData.firstName + formData.lastName || "Mitanshu Gor"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {formData.birth_date || "03/01/2002"}
          </p>
          <p>
            <strong>Gender:</strong> {formData.gender || "Male"}
          </p>
          <p>
            <strong>Blood Group:</strong> {formData.blood_group || "B +ve"}
          </p>
          <p>
            <strong>Marital Status:</strong>{" "}
            {formData.marital_status || "Single"}
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
