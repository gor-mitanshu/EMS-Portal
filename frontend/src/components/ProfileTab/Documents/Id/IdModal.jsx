import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const IdModal = ({ show, setShowModal }) => {
  const initialFormData = {
    id_type: "",
    id: "",
    proof_id: "",
    file: null,
    photoId: false,
    dateOfBirth: false,
    currentAddress: false,
    permanentAddress: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    id_type: "",
    id: "",
    proof_id: "",
    file: null,
  });

  const handleClose = () => {
    setShowModal(false);
    setFormErrors({
      id_type: "",
      id: "",
      proof_id: "",
      file: null,
    });
    setFormData({
      id_type: "",
      id: "",
      proof_id: "",
      file: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset checkboxes when id_type changes
      photoId: false,
      dateOfBirth: false,
      currentAddress: false,
      permanentAddress: false,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (!formData.id_type) {
      errors.id_type = "Please Select any Id Type";
    }
    if (!formData.id) {
      errors.id = "Please enter any Certificate Title";
    }
    if (!formData.file) {
      errors.file = "Please select any file";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("Submitted:", formData);
    handleClose();
    setFormData(initialFormData);
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
          <Form.Group as={Col} controlId="id_type" className="mb-3">
            <Form.Label>Select ID Type</Form.Label>
            <Form.Control
              as="select"
              name="id_type"
              className="form-select no-focus-box-shadow"
              value={formData.id_type}
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
            {formErrors.id_type && (
              <small className="text-danger">{formErrors.id_type}</small>
            )}
          </Form.Group>
          {/* ID */}
          <Form.Group as={Col} controlId="id" className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Certificate Title"
              value={formData.id}
              onChange={handleChange}
            />
            {formErrors.id && (
              <small className="text-danger">{formErrors.id}</small>
            )}
          </Form.Group>
          {/* Render checkboxes based on selected id_type */}
          {formData.id_type && (
            <Form.Label
              style={{ color: "grey" }}
            >{`Use if proof for`}</Form.Label>
          )}
          {checkboxes[formData.id_type]?.map((checkboxName) => (
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
          {formData.id_type !== "ADHAR_CARD" && (
            <Form.Group as={Col} controlId="certificateFile" className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                name="selectedFile"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileChange}
              />
              {formErrors.file && (
                <small className="text-danger">{formErrors.file}</small>
              )}
            </Form.Group>
          )}
          <Button
            variant="secondary"
            className="me-2 btn-danger"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IdModal;
