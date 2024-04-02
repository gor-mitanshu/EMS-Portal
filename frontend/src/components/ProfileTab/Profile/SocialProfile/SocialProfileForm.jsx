import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialProfileForm = ({ formData, formErrors, handleInputChange }) => {
  return (
    <>
      <div className="col mb-2">
        <div className="d-flex align-items-top justify-content-between">
          <FontAwesomeIcon
            icon={faLinkedinIn}
            size="xl"
            className="pe-3 pt-2"
            color="blue"
            style={{ height: "21px", width: "21px" }}
          />
          <div className="w-100">
            <input
              type="text"
              className="form-control no-focus-box-shadow"
              placeholder="LinkedIn Profile"
              name="linked_in"
              value={formData.linked_in}
              onChange={handleInputChange}
            />
            {formErrors.linked_in && (
              <small className="text-danger">{formErrors.linked_in}</small>
            )}
          </div>
        </div>
      </div>
      <div className="col mb-2">
        <div className="d-flex align-items-top justify-content-between">
          <FontAwesomeIcon
            icon={faFacebook}
            size="xl"
            className="pe-3 pt-2"
            color="blue"
            style={{ height: "21px", width: "21px" }}
          />
          <div className="w-100">
            <input
              type="text"
              className="form-control no-focus-box-shadow"
              placeholder="Facebook Profile"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
            />
            {formErrors.facebook && (
              <small className="text-danger">{formErrors.facebook}</small>
            )}
          </div>
        </div>
      </div>
      <div className="col mb-2">
        <div className="d-flex align-items-top justify-content-between">
          <FontAwesomeIcon
            icon={faTwitter}
            size="xl"
            className="pe-3 pt-2"
            color="blue"
            style={{ height: "21px", width: "21px" }}
          />
          <div className="w-100">
            <input
              type="text"
              className="form-control no-focus-box-shadow"
              placeholder="Twitter Profile"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
            />
            {formErrors.twitter && (
              <small className="text-danger">{formErrors.twitter}</small>
            )}
          </div>
        </div>
      </div>
      <button className="btn btn-primary mr-2">Save</button>
    </>
  );
};

export default SocialProfileForm;
