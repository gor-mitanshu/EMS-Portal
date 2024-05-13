import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const initialData = {
  document_type: "",
  document_id: "",
  file: null,
  photo_id: false,
  date_of_birth: false,
  current_address: false,
  permanent_address: false,
}
const IdModal = ({
  show,
  handleClose,
  formData = initialData,
  formErrors,
  handleChange,
  handleSubmit,
  checkboxes,
  handleCheckboxChange,
  handleFileChange,
  editId
}) => {
  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>
          { editId ? "Edit Certificate" : "Add Certificate" }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          {/* ID Type */ }
          <Form.Group as={ Col } controlId="document_type" className="mb-3">
            <Form.Label>Select ID Type</Form.Label>
            <Form.Control
              as="select"
              name="document_type"
              className="form-select no-focus-box-shadow"
              value={ formData.document_type }
              onChange={ handleChange }
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
            { formErrors.document_type && (
              <small className="text-danger">{ formErrors.document_type }</small>
            ) }
          </Form.Group>
          {/* ID */ }
          <Form.Group as={ Col } controlId="document_id" className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="document_id"
              className="form-group no-focus-box-shadow"
              placeholder="Enter Certificate Title"
              value={ formData.document_id }
              onChange={ handleChange }
            />
            { formErrors.document_id && (
              <small className="text-danger">{ formErrors.document_id }</small>
            ) }
          </Form.Group>
          {/* Render checkboxes based on selected id_type */ }
          { formData.document_type && (
            <Form.Label
              style={ { color: "grey" } }
            >{ `Use if proof for` }</Form.Label>
          ) }
          { checkboxes[formData.document_type]?.map((checkbox) => (
            <Form.Group
              key={ checkbox.label }
              controlId={ checkbox.label }
              className="mb-3"
            >
              <Form.Check
                type="checkbox"
                id={ checkbox.label }
                label={ checkbox.label }
                name={ checkbox.name }
                checked={ formData ? formData[checkbox.name] : false }
                onChange={ handleCheckboxChange }
              />
            </Form.Group>
          )) }
          {/* File */ }
          { formData.document_type !== "ADHAR_CARD" && (
            <Form.Group as={ Col } controlId="certificateFile" className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                name="file"
                className="form-group no-focus-box-shadow"
                onChange={ handleFileChange }
              />
              { formErrors.file && (
                <small className="text-danger">{ formErrors.file }</small>
              ) }
            </Form.Group>
          ) }
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IdModal;
