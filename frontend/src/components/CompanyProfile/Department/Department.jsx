import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Department = () => {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { id: Date.now() }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <>
      <ProfileField title={"Document"}>
        {fields.map((field) => (
          <div key={field.id}>
            <input type="text" placeholder="Field 1" />
            <input type="text" placeholder="Field 2" />
            <input type="text" placeholder="Field 3" />
            <button onClick={() => removeField(field.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button onClick={addField}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </ProfileField>
    </>
  );
};

export default Department;
