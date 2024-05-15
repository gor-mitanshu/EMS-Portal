import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const CertificateModal = ({
  show,
  handleClose,
  formData,
  formErrors,
  handleChange,
  handleFileChange,
  handleSubmit,
  hasChanges
}) => {
  const handleCancel = () => {
    if (hasChanges(formData)) {
      Swal.fire({
        title: "Are you sure?",
        text: "Changes will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Don't Save!",
      }).then((result) => {
        if (result.isConfirmed) {
          handleClose();
        }
      });
    } else {
      handleClose();
    }
  };
  return (
    <Modal show={ show } onHide={ handleCancel }>
      <Modal.Header closeButton>
        <Modal.Title>
          { formData._id ? "Edit Certificate" : "Add Certificate" }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          <Form.Group as={ Col } controlId="certificate_name" className="mb-3">
            <Form.Label>Select Course Type</Form.Label>
            <Form.Control
              as="select"
              name="certificate_name"
              className="form-select no-focus-box-shadow"
              value={ formData.certificate_name }
              onChange={ handleChange }
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
            { formErrors.certificate_name && (
              <small className="text-danger">
                { formErrors.certificate_name }
              </small>
            ) }
          </Form.Group>
          <Form.Group as={ Col } controlId="certificate_title" className="mb-3">
            <Form.Label>Certification Title</Form.Label>
            <Form.Control
              type="text"
              name="certificate_title"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Certificate Title"
              value={ formData.certificate_title }
              onChange={ handleChange }
            />
            { formErrors.certificate_title && (
              <small className="text-danger">
                { formErrors.certificate_title }
              </small>
            ) }
          </Form.Group>
          <Form.Group as={ Col } controlId="certificateFile" className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type="file"
              name="certificate_file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={ handleFileChange }
            />
            {/* {formData.certificate_file ? (
              <small>Current File: {formData.certificate_file}</small>
            ) : (
              <small>No file selected</small>
            )} */}
            { formErrors.certificate_file && (
              <small className="text-danger">
                { formErrors.certificate_file }
              </small>
            ) }
          </Form.Group>
          <Button
            variant="secondary"
            className="me-2 btn-danger"
            onClick={ handleCancel }
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
