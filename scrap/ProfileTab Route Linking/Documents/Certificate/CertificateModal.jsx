import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const CertificateModal = ({ show, setShowModal }) => {
  const initialFormData = {
    courseType: "",
    certificationTitle: "",
    selectedFile: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);

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
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      selectedFile: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (!formData.courseType) {
      errors.courseType = "Please Select any Course Type";
    }
    if (!formData.certificationTitle) {
      errors.certificationTitle = "Please enter any Certificate Title";
    }
    if (!formData.selectedFile) {
      errors.selectedFile = "Please select any file";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
            {formErrors.courseType && (
              <small className="text-danger">{formErrors.courseType}</small>
            )}
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
            />
            {formErrors.certificationTitle && (
              <small className="text-danger">
                {formErrors.certificationTitle}
              </small>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="certificateFile" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="selectedFile"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
            {formErrors.selectedFile && (
              <small className="text-danger">{formErrors.selectedFile}</small>
            )}
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
