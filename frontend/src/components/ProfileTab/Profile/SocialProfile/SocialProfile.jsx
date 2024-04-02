import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialProfile = () => {
  return (
    <>
      <div className="d-flex">
        <a href="/" className="pe-4">
          <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
        </a>

        <a href="/" className="pe-4">
          <FontAwesomeIcon icon={faFacebook} size="2xl" />
        </a>

        <a href="/" className="pe-4">
          <FontAwesomeIcon icon={faTwitter} size="2xl" />
        </a>
      </div>
    </>
  );
};

export default SocialProfile;
