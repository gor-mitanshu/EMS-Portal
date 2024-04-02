import React from "react";
import User from "../../../../assets/user.jpg";

const PersonalProfile = ({ formData }) => {
  const formatedDate = formData.birth_date;
  const newDate = new Date(formatedDate);
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
            <strong>Name: </strong>{" "}
            {formData.firstName && formData.lastName
              ? formData.firstName + " " + formData.lastName
              : "-"}
          </p>
          <p>
            <strong>Date of Birth: </strong>{" "}
            {formData.birth_date
              ? newDate.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </p>
          <p>
            <strong>Gender: </strong>
            {formData.gender ? formData.gender : "-"}
          </p>
          <p>
            <strong>Blood Group: </strong>
            {formData.blood_group ? formData.blood_group : "-"}
          </p>
          <p>
            <strong>Marital Status: </strong>
            {formData.marital_status ? formData.marital_status : "-"}
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
