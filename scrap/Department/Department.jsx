import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "../../frontend/src/UI/ProfileCards/ProfileCard";

const Department = () => {
  const [fields, setFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});

  const addField = () => {
    setFields([...fields, { id: Date.now() }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    setFieldValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[id];
      return newValues;
    });
  };

  const handleChange = (id, fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = () => {
    // Process the entered data (for example, send it to a server)
    const data = fields.map((field) => fieldValues[field.id]);
    console.log("Data submitted:", data);
  };

  const handleCancel = () => {
    setFields([]);
    setFieldValues({});
  };

  return (
    <>
      <Card title={"Department"}>
        {fields.map((field) => (
          <div key={field.id} className="row mb-2">
            <div className="form-group col-md-5">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Department"
                value={fieldValues[field.id]?.department || ""}
                onChange={(e) =>
                  handleChange(field.id, "department", e.target.value)
                }
              />
            </div>

            <div className="form-group col-md-5">
              {fieldValues[field.id]?.subdepartments?.map(
                (subdepartment, index) => (
                  <div key={index} className="row mb-2">
                    <div className="form-group col-md-8">
                      <input
                        type="text"
                        className="form-control mr-2"
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
                    <div className="form-group col-md-4">
                      <button
                        className="btn btn-outline-danger"
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
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                )
              )}
              <div className="form-group col-md-12">
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => {
                    const newSubdepartments = [
                      ...(fieldValues[field.id]?.subdepartments || []),
                      "",
                    ];
                    handleChange(field.id, "subdepartments", newSubdepartments);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Subdepartment
                </button>
              </div>
            </div>

            <div className="form-group col-md-2">
              <button
                className="btn btn-outline-danger"
                onClick={() => removeField(field.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}

        <button className="btn btn-outline-primary" onClick={addField}>
          <FontAwesomeIcon icon={faPlus} /> Add Department
        </button>
        {fields.length > 0 && (
          <>
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger me-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default Department;
