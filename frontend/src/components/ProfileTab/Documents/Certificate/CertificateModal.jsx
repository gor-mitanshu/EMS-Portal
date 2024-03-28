import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const CertificateModal = ({ show, handleClose }) => {
  const initialFormData = {
    courseType: "",
    certificationTitle: "",
    selectedFile: null,
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
      selectedFile: e.target.files[0],
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
          <Form.Group as={Col} controlId="courseType" className="mb-3">
            <Form.Label>Select Course Type</Form.Label>
            <Form.Control
              as="select"
              name="courseType"
              className="form-select no-focus-box-shadow"
              value={formData.courseType}
              onChange={handleChange}
            >
              <option value="">Select Qualification Type</option>
              <option value="Graduation">Graduation</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Diploma">Diploma</option>
              <option value="Pre University">Pre University</option>
              <option value="Other Education">Other Education</option>
              <option value="Certificate">Certificate</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="certificationTitle" className="mb-3">
            <Form.Label>Certification Title</Form.Label>
            <Form.Control
              type="text"
              name="certificationTitle"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Certificate Title"
              value={formData.certificationTitle}
              onChange={handleChange}
              required
            />
          </Form.Group>
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

export default CertificateModal;
