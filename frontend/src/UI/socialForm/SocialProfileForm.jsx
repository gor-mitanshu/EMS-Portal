import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialProfileForm = ({ formData, formErrors, handleInputChange }) => {
  console.log(formData);
  return (
    <>
      <div className="form-input-wrapper w-100">
        <FontAwesomeIcon
          icon={faLinkedinIn}
          className="prefix-icon"
          color="#0077B5"
          style={{ height: "21px", width: "21px" }}
        />
        <input
          type="text"
          className="form-input pe-0"
          placeholder="LinkedIn Profile"
          name="linked_in"
          value={formData ? formData.linked_in : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-input-wrapper w-100">
        <FontAwesomeIcon
          icon={faFacebookF}
          className="prefix-icon"
          color="#316FF6"
          style={{ height: "21px", width: "21px" }}
        />
        <input
          type="text"
          className="form-input pe-0"
          placeholder="Facebook Profile"
          name="facebook"
          value={formData ? formData.facebook : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-input-wrapper w-100">
        <FontAwesomeIcon
          icon={faTwitter}
          className="prefix-icon"
          color="#1DA1F2"
          style={{ height: "21px", width: "21px" }}
        />
        <input
          type="text"
          className="form-input pe-0"
          placeholder="Twitter Profile"
          name="twitter"
          value={formData ? formData.twitter : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-end">
        <button className="btn btn-primary px-4">Save</button>
      </div>
    </>
  );
};

export default SocialProfileForm;
