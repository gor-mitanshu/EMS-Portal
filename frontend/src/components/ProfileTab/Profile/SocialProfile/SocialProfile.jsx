import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialProfile = ({ formData }) => {
  return (
    <>
      <div className="d-flex">
        <a
          href={
            formData.linked_in
              ? `//${formData.linked_in}`
              : "https://linkedin.com/in/"
          }
          target="_blank"
          className="pe-4"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
        </a>

        <a
          href={
            formData.facebook
              ? `//${formData.facebook}`
              : "https://linkedin.com/in/"
          }
          target="_blank"
          className="pe-4"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} size="2xl" />
        </a>

        <a
          href={
            formData.twitter
              ? `//${formData.twitter}`
              : "https://linkedin.com/in/"
          }
          target="_blank"
          className="pe-4"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} size="2xl" />
        </a>
      </div>
    </>
  );
};

export default SocialProfile;
