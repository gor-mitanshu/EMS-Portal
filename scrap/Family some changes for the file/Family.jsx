import { useState } from "react";
import FamilySection from "./FamilySection";

const Family = () => {
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

  // for Family form for adding the main form
  const handleFamilySubmit = (e) => {
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

  // for Family form for adding the main form
  const handleEmergencyFamilySubmit = (e) => {
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
  const handleFamilyDeleteClick = (index) => {
    const updatedList = familyList.filter((_, i) => i !== index);
    setFamilyList(updatedList);
  };

  // For deleting the form entry entered
  const handleEmergencyFamilyDeleteClick = (index) => {
    const updatedList = familyList.filter((_, i) => i !== index);
    setFamilyList(updatedList);
  };

  // for editing the form and submit the data through this
  const handleFamilyEdit = (index, updatedData) => {
    const updatedFamilyList = familyList.map((item, i) => {
      if (i === index) {
        return updatedData;
      }
      return item;
    });
    setFamilyList(updatedFamilyList);
  };

  // for editing the form and submit the data through this
  const handleEmergencyEdit = (index, updatedData) => {
    const updatedFamilyList = familyList.map((item, i) => {
      if (i === index) {
        return updatedData;
      }
      return item;
    });
    setFamilyList(updatedFamilyList);
  };

  return (
    <>
      <FamilySection
        title="Family Members"
        showForm={showForm}
        formData={formData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        familyList={familyList}
        handleAddClick={handleAddClick}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleFamilySubmit}
        handleDeleteClick={handleFamilyDeleteClick}
        handleSaveEdit={handleFamilyEdit}
        handleCancel={handleCancel}
      />
      <FamilySection
        title="Emergency Contact"
        showForm={showForm}
        formData={formData}
        handleAddClick={handleAddClick}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleEmergencyFamilySubmit}
        handleDeleteClick={handleEmergencyFamilyDeleteClick}
        handleSaveEdit={handleEmergencyEdit}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Family;
