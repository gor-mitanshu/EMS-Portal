import React from "react";

const ContactInformation = ({ formData }) => {
  return (
    <>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {formData.phone}
      </p>
    </>
  );
};

export default ContactInformation;
