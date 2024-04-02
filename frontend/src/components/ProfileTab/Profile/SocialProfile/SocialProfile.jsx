import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const SocialProfile = ({ formData }) => {
  // console.log(formData);
  return (
    <>
      <div className="d-flex">
        <Link
          // to={formData.linked_in}
          target="_blank"
          className="pe-4"
        >
          <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
        </Link>

        <Link
          //  to={formData.facebook}
          target="_blank"
          className="pe-4"
        >
          <FontAwesomeIcon icon={faFacebook} size="2xl" />
        </Link>

        <Link
          // to={formData.twitter}
          target="_blank"
          className="pe-4"
        >
          <FontAwesomeIcon icon={faTwitter} size="2xl" />
        </Link>
      </div>
    </>
  );
};

export default SocialProfile;
