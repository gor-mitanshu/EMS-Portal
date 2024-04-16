import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <>
      <ProfileField title={"Department"}>
        {fields.map((field) => (
          <div key={field.id} className="row align-items-center">
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Department"
                value={fieldValues[field.id]?.department || ""}
                onChange={(e) =>
                  handleChange(field.id, "department", e.target.value)
                }
              />
            </div>
            <div className="form-group col-md-8">
              {fieldValues[field.id]?.subdepartments?.map(
                (subdepartment, index) => (
                  <div key={index} className="row">
                    <div className="form-group col-md-10">
                      <input
                        type="text"
                        className="form-control"
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
                    <div className="form-group col-md-2">
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
              <div className="row">
                <div className="form-group col-md-10">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      const newSubdepartments = [
                        ...(fieldValues[field.id]?.subdepartments || []),
                        "",
                      ];
                      handleChange(
                        field.id,
                        "subdepartments",
                        newSubdepartments
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Subdepartment
                  </button>
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
            </div>
          </div>
        ))}
        <div className="form-group">
          <button className="btn btn-outline-primary" onClick={addField}>
            <FontAwesomeIcon icon={faPlus} /> Add Department
          </button>
          {fields.length > 0 && (
            <button className="btn btn-primary ml-2" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </ProfileField>
    </>
  );
};

export default Department;
