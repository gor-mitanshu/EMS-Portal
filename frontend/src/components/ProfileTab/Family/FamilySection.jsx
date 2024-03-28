import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FamilyForm from "./FamilyForm";
import FamilyItem from "./FamilyItem";

const FamilySection = ({ title }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    family_name: "",
    family_relationship: "",
    family_birth_date: "",
    dependant: "",
  });
  const [familyList, setFamilyList] = useState([]);

  const handleAddClick = () => {
    setShowForm(true);
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current form data to the FamilyList
    setFamilyList([...familyList, formData]);

    // Reset the form data
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });

    // If all things work fine then setting the form back to false
    setShowForm(false);
  };

  const handleDeleteClick = (index) => {
    const updatedList = familyList.filter((_, i) => i !== index);
    setFamilyList(updatedList);
  };

  const handleSaveEdit = (index, updatedData) => {
    const updatedFamilyList = familyList.map((item, i) => {
      if (i === index) {
        return updatedData;
      }
      return item;
    });
    setFamilyList(updatedFamilyList);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <ProfileField title={title}>
          <>
            {!showForm ? (
              <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  color="white"
                  style={{ paddingRight: "10px" }}
                />
                Add
              </button>
            ) : (
              <FamilyForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            )}

            <div className="p-4 m-0">
              {familyList.length > 0 && (
                <>
                  {familyList.map((family, index) => (
                    <FamilyItem
                      key={index}
                      family={family}
                      valueIndex={index}
                      handleDeleteClick={() => handleDeleteClick(index)}
                      onSaveEdit={handleSaveEdit}
                      handleCancel={handleCancel}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        </ProfileField>
      </div>
    </div>
  );
};

export default FamilySection;
