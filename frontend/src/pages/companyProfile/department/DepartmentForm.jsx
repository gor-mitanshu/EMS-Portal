import React from "react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DepartmentForm = ({
  fields,
  fieldValues,
  handleChange,
  removeField,
  handleCancel,
  handleSubmit,
}) => {
  return (
    <>
      { fields.map((field) => (
        <div key={ field.id } className="department-field">
          <div className="department-field-inner">
            <div className="department-select">
              <select
                className="form-input"
              >
                <option value="default">Department head</option>
                <option value="dsdsdsdsdas">dsdsds head</option>
                <option value="Dsadaepartment">Dsadaepartment head</option>
                <option value="sadwdDepartment">sadwdDepartment head</option>
                <option value="Departmsdasxdsaent">Departmsdasxdsaent head</option>
              </select>
            </div>
            <div className="department-input">
              <input
                type="text"
                className="form-input"
                placeholder="Department"
                value={ fieldValues[field.id]?.department || "" }
                onChange={ (e) =>
                  handleChange(field.id, "department", e.target.value)
                }
              />
            </div>
            <div className="department-subdepartments">
              { fieldValues[field.id]?.subdepartments?.map(
                (subdepartment, index) => (
                  <div key={ index } className="subdepartment">
                    <input
                      type="text"
                      className="form-input"
                      placeholder={ `Subdepartment ${index + 1}` }
                      value={ subdepartment }
                      onChange={ (e) => {
                        const newSubdepartments = [
                          ...fieldValues[field.id].subdepartments,
                        ];
                        newSubdepartments[index] = e.target.value;
                        handleChange(
                          field.id,
                          "subdepartments",
                          newSubdepartments
                        );
                      } }
                    />
                    <FontAwesomeIcon
                      icon={ faTrash }
                      className="delete-subdepartment"
                      onClick={ () => {
                        const newSubdepartments = [
                          ...fieldValues[field.id].subdepartments,
                        ];
                        newSubdepartments.splice(index, 1);
                        handleChange(
                          field.id,
                          "subdepartments",
                          newSubdepartments
                        );
                      } }
                    />
                  </div>
                )
              ) }
              <button
                className="btn btn-outline-primary add-subdepartment"
                onClick={ () => {
                  const newSubdepartments = [
                    ...(fieldValues[field.id]?.subdepartments || []),
                    "",
                  ];
                  handleChange(
                    field.id,
                    "subdepartments",
                    newSubdepartments
                  );
                } }
              >
                <FontAwesomeIcon icon={ faPlus } /> Add Subdepartment
              </button>
            </div>
          </div>
          <div className="delete-department">
            <FontAwesomeIcon
              icon={ faTrash }
              className="delete-department-icon"
              onClick={ () => removeField(field.id) }
            />
          </div>
        </div>
      )) }
      <div className="department-buttons">
        { fields.length > 0 && (
          <div>
            <button
              className="btn btn-outline-danger cancel-button"
              onClick={ handleCancel }
            >
              Cancel
            </button>
            <button
              className="btn btn-primary submit-button"
              onClick={ handleSubmit }
            >
              Submit
            </button>
          </div>
        ) }
      </div>
    </>
  );
};

export default DepartmentForm;
