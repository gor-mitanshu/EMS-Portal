import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import FamilyForm from "./FamilyForm";
import FamilyItem from "./FamilyItem";
import axios from "axios";
import { toast } from "react-toastify";

const FamilySection = ({ title, emergency }) => {
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

  const getFamilyDetails = async () => {
    const accessToken = localStorage.getItem("token");
    const accessTokenwithoutQuotes = JSON.parse(accessToken);
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/getFamilyDetails`,
      {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      }
    );
    if (res) {
      setFamilyList(res.data.familyDetails);
    }
  };

  useEffect(() => {
    getFamilyDetails();
  }, []);
  // for Family form for adding the main form
  const handleSubmit = async (e) => {
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
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addFamilyDetails`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res) {
        setFamilyList([...familyList, formData]);
        toast.success(res.data.message);
        getFamilyDetails();
      }
    } catch (error) {}
    // Add the current form data to the FamilyList

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
  const handleDeleteClick = async (index, id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenWithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteFamilyMemberDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${accessTokenWithoutQuotes}` },
        }
      );
      if (res) {
        console.log(res);
        const updatedList = familyList.filter((_, i) => i !== index);
        setFamilyList(updatedList);
        toast.success(res.data.message);
        getFamilyDetails();
      }
    } catch (error) {}
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
                  {familyList[0].familyMemberDetails.map((family, index) => (
                    <FamilyItem
                      key={index}
                      family={family}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      valueIndex={index}
                      handleDeleteClick={() =>
                        handleDeleteClick(index, family._id)
                      }
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
