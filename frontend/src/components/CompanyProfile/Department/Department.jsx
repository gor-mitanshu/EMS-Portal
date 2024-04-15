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
      <ProfileField title={"Document"}>
        {fields.map((field) => (
          <div key={field.id}>
            <input
              type="text"
              placeholder="Field 1"
              value={fieldValues[field.id]?.field1 || ""}
              onChange={(e) => handleChange(field.id, "field1", e.target.value)}
            />
            <input
              type="text"
              placeholder="Field 2"
              value={fieldValues[field.id]?.field2 || ""}
              onChange={(e) => handleChange(field.id, "field2", e.target.value)}
            />
            <input
              type="text"
              placeholder="Field 3"
              value={fieldValues[field.id]?.field3 || ""}
              onChange={(e) => handleChange(field.id, "field3", e.target.value)}
            />
            <button onClick={() => removeField(field.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button onClick={addField}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
        {fields.length > 0 && <button onClick={handleSubmit}>Submit</button>}
      </ProfileField>
    </>
  );
};

export default Department;
