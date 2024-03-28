import React from "react";
import { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const IdModal = ({ show, handleClose }) => {
  const initialFormData = {
    id_type: "",
    id: "",
    proof_id: "",
    file: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    handleClose();
    setFormData(initialFormData);
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
              <option value="pan_card">PAN Card</option>
              <option value="adharCard">AdharCard</option>
              <option value="passport">Passport</option>
              <option value="driving_licience">Driving Licence</option>
              <option value="voter_id">Voter Id</option>
              <option value="Electricity Bill">Electricity Bill</option>
              <option value="phone_bill">Phone Bill</option>
              <option value="bank_passbook">Bank Passbook</option>
              <option value="rental_agreement">Rental Agreement</option>
            </Form.Control>
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
          </Form.Group>
          {/* CheckBox */}
          <Form.Group as={Col} controlId="checkboxes" className="mb-3">
            <Form.Label>Select Options</Form.Label>
            <Form.Check
              type="checkbox"
              id="photoId"
              label="Photo ID"
              name="photoId"
              checked={formData.photoId}
              onChange={(e) =>
                setFormData({ ...formData, photoId: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              id="dateOfBirth"
              label="Date of Birth"
              name="dateOfBirth"
              checked={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              id="currentAddress"
              label="Current Address"
              name="currentAddress"
              checked={formData.currentAddress}
              onChange={(e) =>
                setFormData({ ...formData, currentAddress: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              id="permanentAddress"
              label="Permanent Address"
              name="permanentAddress"
              checked={formData.permanentAddress}
              onChange={(e) =>
                setFormData({ ...formData, permanentAddress: e.target.checked })
              }
            />
          </Form.Group>
          {/* File */}
          <Form.Group as={Col} controlId="certificateFile" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="selectedFile"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
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
