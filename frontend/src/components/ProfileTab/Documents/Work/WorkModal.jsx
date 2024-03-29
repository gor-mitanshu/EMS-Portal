import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const WorkModal = ({ show, handleClose }) => {
  const initialFormData = {
    document_title: "",
    document_description: "",
    selected_work_file: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);

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
      selected_work_file: e.target.files[0],
    });
    setFormErrors({
      ...formErrors,
      selected_work_file: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Basic Info Section
    if (!formData.document_title) {
      errors.document_title = "Please Enter Document Title";
    }
    if (!formData.document_description) {
      errors.document_description = "Please Enter Description Title";
    }
    if (!formData.selected_work_file) {
      errors.selected_work_file = "Please select any file";
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
        <Modal.Title>Add Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="documentTitle" className="mb-3">
            <Form.Label>Document</Form.Label>
            <Form.Control
              type="text"
              name="documentTitle"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Document Title"
              value={formData.documentTitle}
              onChange={handleChange}
            />
            {formErrors.document_title && (
              <small className="text-danger">{formErrors.document_title}</small>
            )}
          </Form.Group>
          {/* Description */}
          <Form.Group
            as={Col}
            controlId="document_description"
            className="mb-3"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="document_description"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Description Title"
              value={formData.document_description}
              onChange={handleChange}
            />
            {formErrors.document_description && (
              <small className="text-danger">
                {formErrors.document_description}
              </small>
            )}
          </Form.Group>
          {/* File Selection */}
          <Form.Group as={Col} controlId="workFile" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="workFile"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
            {formErrors.selected_work_file && (
              <small className="text-danger">
                {formErrors.selected_work_file}
              </small>
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

export default WorkModal;
