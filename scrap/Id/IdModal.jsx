import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import axios from "axios";

const IdModal = ({ show, setShowModal }) => {
  const initialFormData = {
    document_type: "",
    document_id: "",
    file: null,
    photo_id: false,
    date_of_birth: false,
    current_address: false,
    permanent_address: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    document_type: "",
    document_id: "",
    file: null,
  });

  const handleClose = () => {
    setShowModal(false);
    setFormErrors(initialFormData);
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset checkboxes when id_type changes
      photo_id: false,
      date_of_birth: false,
      current_address: false,
      permanent_address: false,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleCheckboxChange = (e) => {
    debugger;
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      file: "",
    });
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (!formData.document_type) {
      errors.document_type = "Please Select any Id Type";
    }
    if (!formData.document_id) {
      errors.document_id = "Please enter any Certificate Title";
    }
    if (!formData.file) {
      errors.file = "Please select any file";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const proof = {
      photo_id: formData.photo_id,
      date_of_birth: formData.date_of_birth,
      current_address: formData.current_address,
      permanent_address: formData.permanent_address,
    };
    console.log(proof);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("document_type", formData.document_type);
      formDataToSend.append("document_id", formData.document_id);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("proof", JSON.stringify(proof));

      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addDocument`,
        formDataToSend,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res) {
        console.log("Submitted:", formData);
        handleClose();
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const checkboxes = {
    PAN_CARD: [
      "Photo Id",
      "Date of Birth",
      "Current Address",
      "Permanent Address",
    ],
    ADHAR_CARD: [
      "Photo Id",
      "Date of Birth",
      "Current Address",
      "Permanent Address",
    ],
    PASSPORT: [
      "Photo Id",
      "Date of Birth",
      "Current Address",
      "Permanent Address",
    ],
    VOTER_ID: [
      "Photo Id",
      "Date of Birth",
      "Current Address",
      "Permanent Address",
    ],
    ELECTRICITY_BILL: ["Current Address", "Permanent Address"],
    PHONE_BILL: ["Current Address", "Permanent Address"],
    BANK_PASSBOOK: ["Current Address", "Permanent Address"],
    RENTAL_AGREEMENT: ["Current Address"],
    DRIVING_LICENSE: [
      "Photo Id",
      "Date of Birth",
      "Current Address",
      "Permanent Address",
    ],
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ID Type */}
          <Form.Group as={Col} controlId="document_type" className="mb-3">
            <Form.Label>Select ID Type</Form.Label>
            <Form.Control
              as="select"
              name="document_type"
              className="form-select no-focus-box-shadow"
              value={formData.document_type}
              onChange={handleChange}
            >
              <option value="">---</option>
              <option value="PAN_CARD">PAN Card</option>
              <option value="PASSPORT">Passport</option>
              <option value="VOTER_ID">Voter Id</option>
              <option value="ELECTRICITY_BILL">Electricity Bill</option>
              <option value="PHONE_BILL">Phone Bill</option>
              <option value="BANK_PASSBOOK">Bank Passbook</option>
              <option value="RENTAL_AGREEMENT">Rental Agreement</option>
              <option value="DRIVING_LICENSE">Driving Licence</option>
              <option value="ADHAR_CARD">Adhar Card</option>
            </Form.Control>
            {formErrors.document_type && (
              <small className="text-danger">{formErrors.document_type}</small>
            )}
          </Form.Group>
          {/* ID */}
          <Form.Group as={Col} controlId="document_id" className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="document_id"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Certificate Title"
              value={formData.document_id}
              onChange={handleChange}
            />
            {formErrors.document_id && (
              <small className="text-danger">{formErrors.document_id}</small>
            )}
          </Form.Group>
          {/* Render checkboxes based on selected id_type */}
          {formData.document_type && (
            <Form.Label
              style={{ color: "grey" }}
            >{`Use if proof for`}</Form.Label>
          )}
          {checkboxes[formData.document_type]?.map((checkboxName) => (
            <Form.Group
              key={checkboxName}
              controlId={checkboxName}
              className="mb-3"
            >
              <Form.Check
                type="checkbox"
                id={checkboxName}
                label={checkboxName}
                name={checkboxName}
                checked={formData[checkboxName]}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          ))}
          {/* File */}
          {formData.document_type !== "ADHAR_CARD" && (
            <Form.Group as={Col} controlId="certificateFile" className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                name="file"
                className="form-group no-focus-box-shadow"
                onChange={handleFileChange}
              />
              {formErrors.file && (
                <small className="text-danger">{formErrors.file}</small>
              )}
            </Form.Group>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IdModal;
