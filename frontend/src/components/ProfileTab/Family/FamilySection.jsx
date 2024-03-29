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
  const [formErrors, setFormErrors] = useState({
    family_name: "",
    family_relationship: "",
    family_birth_date: "",
    dependant: "",
  });
  const [familyList, setFamilyList] = useState([]);

  // For showing and hiding the form
  const handleAddClick = () => {
    setShowForm(true);
    // setFormData({
    //   family_name: "Sanjay Gor",
    //   family_relationship: "Father",
    //   family_birth_date: "1971-12-23",
    //   dependant: "",
    // });
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
  };

  // For onchange property
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // for Family form for adding the main form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handling the errors
    let errors = {};

    // Validate each form field
    if (!formData.family_name) {
      errors.family_name = "Name is required";
    }
    if (!formData.family_relationship) {
      errors.family_relationship = "Relationship is required";
    }
    if (!formData.family_birth_date) {
      errors.family_birth_date = "Birth Date is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Add the current form data to the FamilyList
    setFamilyList([...familyList, formData]);

    // Reset the form data
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
    setFormErrors({});
    // If all things work fine then setting the form back to false
    setShowForm(false);
  };

  // For deleting the form entry entered
  const handleDeleteClick = (index) => {
    const updatedList = familyList.filter((_, i) => i !== index);
    setFamilyList(updatedList);
  };

  // for editing the form and submit the data through this
  const handleSaveEdit = (index, updatedData) => {
    const updatedFamilyList = familyList.map((item, i) => {
      if (i === index) {
        return updatedData;
      }
      return item;
    });
    setFamilyList(updatedFamilyList);
  };

  // for canceling the form
  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
    setFormErrors({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
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
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}

            <div className="p-4 m-0">
              {familyList.length > 0 && (
                <>
                  {familyList.map((family, index) => (
                    <FamilyItem
                      key={index}
                      family={family}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      valueIndex={index}
                      handleDeleteClick={() => handleDeleteClick(index)}
                      onSaveEdit={handleSaveEdit}
                      handleCancel={handleCancel}
                      handleCheckboxChange={handleCheckboxChange}
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
