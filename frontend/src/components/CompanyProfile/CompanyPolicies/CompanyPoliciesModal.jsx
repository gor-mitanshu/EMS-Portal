import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const CompanyPoliciesModal = ({
  show,
  handleClose,
  formData,
  formErrors,
  handleChange,
  handleFileChange,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {" "}
          {formData._id ? "Edit Policy" : "Add Policy"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="policy_title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="policy_title"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Title"
              value={formData.policy_title}
              onChange={handleChange}
            />
            {formErrors.policy_title && (
              <small className="text-danger">{formErrors.policy_title}</small>
            )}
          </Form.Group>
          {/* Description */}
          <Form.Group as={Col} controlId="policy_description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="policy_description"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Description"
              value={formData.policy_description}
              onChange={handleChange}
            />
            {formErrors.policy_description && (
              <small className="text-danger">
                {formErrors.policy_description}
              </small>
            )}
          </Form.Group>
          {/* File Selection */}
          <Form.Group as={Col} controlId="policy_file" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="policy_file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
            {formErrors.policy_file && (
              <small className="text-danger">{formErrors.policy_file}</small>
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

export default CompanyPoliciesModal;
