import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="col-md-12">
        <ProfileField title="Education">
          <>
            {!showForm && (
              <button className="btn btn-primary" onClick={handleAddClick}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  color="white"
                  style={{ paddingRight: "10px" }}
                />
                Add
              </button>
            )}
            {showForm && (
              <form>
                
                {/* Form fields go here */}
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            )}
          </>
        </ProfileField>
      </div>
    </>
  );
};

export default Education;
