import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const WorkModal = ({
  show,
  handleClose,
  formData,
  formErrors,
  handleChange,
  handleFileChange,
  handleSubmit,
  editId
}) => {
  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>
          { " " }
          { editId ? "Edit Document" : "Add Document" }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          <Form.Group as={ Col } controlId="work_name" className="mb-3">
            <Form.Label>Document</Form.Label>
            <Form.Control
              type="text"
              name="work_name"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Document Title"
              value={ formData.work_name }
              onChange={ handleChange }
            />
            { formErrors.work_name && (
              <small className="text-danger">{ formErrors.work_name }</small>
            ) }
          </Form.Group>
          {/* Description */ }
          <Form.Group as={ Col } controlId="work_description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="work_description"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Description Title"
              value={ formData.work_description }
              onChange={ handleChange }
            />
            { formErrors.work_description && (
              <small className="text-danger">
                { formErrors.work_description }
              </small>
            ) }
          </Form.Group>
          {/* File Selection */ }
          <Form.Group as={ Col } controlId="work_file" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="work_file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={ handleFileChange }
            />
            { formErrors.work_file && (
              <small className="text-danger">{ formErrors.work_file }</small>
            ) }
          </Form.Group>
          <Button
            variant="secondary"
            className="me-2 btn-danger"
            onClick={ handleClose }
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
