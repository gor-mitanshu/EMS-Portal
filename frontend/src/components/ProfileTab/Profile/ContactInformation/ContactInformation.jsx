import React from "react";

const ContactInformation = ({ formData }) => {
  return (
    <>
      <p>
        <strong>Email:</strong> {formData.email || "gor.mitanshu3@gmail.com"}
      </p>
      <p>
        <strong>Phone Number:</strong> {formData.phone || "9558993690"}
      </p>
    </>
  );
};

export default ContactInformation;
