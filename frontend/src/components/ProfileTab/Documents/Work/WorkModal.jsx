import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const WorkModal = ({ show, handleClose }) => {
  const initialFormData = {
    document_title: "",
    document_description: "",
    selected_work_file: null,
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
      selected_work_file: e.target.files[0],
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
              required
            />
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
              required
            />
          </Form.Group>
          {/* File Selection */}
          <Form.Group as={Col} controlId="workFile" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="workFile"
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

export default WorkModal;
