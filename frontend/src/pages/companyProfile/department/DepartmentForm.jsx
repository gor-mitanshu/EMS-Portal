import React from "react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DepartmentForm = ({
  fields,
  fieldValues,
  handleChange,
  removeField,
  addField,
  handleCancel,
  handleSubmit,
}) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field.id} className="d-flex align-items-center mb-4">
          <div className="d-flex border p-4 rounded-3 w-100">
            <div className="w-100 pe-3">
              <div className="form-input-wrapper me-3">
                <input
                  type="text"
                  className="form-input px-0"
                  placeholder="Department"
                  value={fieldValues[field.id]?.department || ""}
                  onChange={(e) =>
                    handleChange(field.id, "department", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-100">
              {fieldValues[field.id]?.subdepartments?.map(
                (subdepartment, index) => (
                  <div className="d-flex">
                    <div className="form-input-wrapper me-4 w-100">
                      <input
                        type="text"
                        className="form-input px-0"
                        placeholder={`Subdepartment ${index + 1}`}
                        value={subdepartment}
                        onChange={(e) => {
                          const newSubdepartments = [
                            ...fieldValues[field.id].subdepartments,
                          ];
                          newSubdepartments[index] = e.target.value;
                          handleChange(
                            field.id,
                            "subdepartments",
                            newSubdepartments
                          );
                        }}
                      />
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faTrash} className="mt-2 fs-5 text-danger" role="button"
                        onClick={() => {
                          const newSubdepartments = [
                            ...fieldValues[field.id].subdepartments,
                          ];
                          newSubdepartments.splice(index, 1);
                          handleChange(
                            field.id,
                            "subdepartments",
                            newSubdepartments
                          );
                        }} />
                    </div>
                  </div>
                ))}
              <button className="btn btn-outline-primary"
                onClick={() => {
                  const newSubdepartments = [
                    ...(fieldValues[field.id]?.subdepartments || []),
                    "",
                  ];
                  handleChange(field.id, "subdepartments", newSubdepartments);
                }}>
                <FontAwesomeIcon icon={faPlus} /> Add Subdepartment
              </button>
            </div>
          </div>
          <div className="ms-3">
            <FontAwesomeIcon icon={faTrash} className="text-danger fs-5 px-3" role="button" onClick={() => removeField(field.id)} />
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center justify-content-between mt-3">
        <button className="btn btn-outline-primary" onClick={addField}>
          <FontAwesomeIcon icon={faPlus} /> Add Department
        </button>

        {fields.length > 0 && (
          <div>
            <button className="btn btn-outline-danger me-3 px-4" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentForm;
