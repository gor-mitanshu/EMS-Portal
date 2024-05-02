import { useEffect, useState } from "react";
import FamilySection from "./FamilySection";
import axios from "axios";
import { toast } from "react-toastify";

const Family = () => {
  const [showForm, setShowForm] = useState(false);
  const [emergencyShowForm, setEmergencyShowForm] = useState(false);
  const [formData, setFormData] = useState({
    family_name: "",
    family_relationship: "",
    family_birth_date: "",
    dependant: "",
  });
  const [emergencyformData, setEmergencyFormData] = useState({
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

  const [emergencyformErrors, setEmergencyFormErrors] = useState({
    family_name: "",
    family_relationship: "",
    family_birth_date: "",
    dependant: "",
  });

  const [familyList, setFamilyList] = useState([]);
  const [emergencyfamilyList, setEmergencyFamilyList] = useState([]);

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

  const handleEmergencyInputChange = (e) => {
    const { name, value } = e.target;
    setEmergencyFormData({
      ...emergencyformData,
      [name]: value,
    });
    setEmergencyFormErrors({
      ...emergencyformErrors,
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

  const handleEmergencyCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEmergencyFormData({
      ...emergencyformData,
      [name]: checked,
    });
  };

  const getFamilyDetails = async () => {
    const accessToken = localStorage.getItem("token");
    const accessTokenwithoutQuotes = JSON.parse(accessToken);
    // const url = emergency
    //   ? `${process.env.REACT_APP_API}/employee/getemergencyFamilyDetails`
    //   : `${process.env.REACT_APP_API}/employee/getFamilyDetails`;
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

  const getEmergencyFamilyDetails = async () => {
    const accessToken = localStorage.getItem("token");
    const accessTokenwithoutQuotes = JSON.parse(accessToken);
    // const url = emergency
    //   ? `${process.env.REACT_APP_API}/employee/getemergencyFamilyDetails`
    //   : `${process.env.REACT_APP_API}/employee/getFamilyDetails`;
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/getemergencyFamilyDetails`,
      {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      }
    );
    if (res) {
      setEmergencyFamilyList(res.data.familyDetails);
    }
  };

  useEffect(() => {
    getEmergencyFamilyDetails();
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
      // const url = emergency
      //   ? `${process.env.REACT_APP_API}/employee/addemergencyFamilyDetails`
      //   : `${process.env.REACT_APP_API}/employee/addFamilyDetails`;
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

  // for Family form for adding the main form
  const handleEmergencySubmit = async (e) => {
    e.preventDefault();
    // Handling the errors
    let errors = {};

    // Validate each form field
    if (!emergencyformData.family_name) {
      errors.family_name = "Name is required";
    }
    if (!emergencyformData.family_relationship) {
      errors.family_relationship = "Relationship is required";
    }
    if (!emergencyformData.family_birth_date) {
      errors.family_birth_date = "Birth Date is required";
    }
    if (Object.keys(errors).length > 0) {
      setEmergencyFormErrors(errors);
      return;
    }
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      // const url = emergency
      //   ? `${process.env.REACT_APP_API}/employee/addemergencyFamilyDetails`
      //   : `${process.env.REACT_APP_API}/employee/addFamilyDetails`;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addemergencyFamilyDetails`,
        emergencyformData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res) {
        emergencyfamilyList([...emergencyfamilyList, emergencyformData]);
        toast.success(res.data.message);
        getEmergencyFamilyDetails();
      }
    } catch (error) {}
    // Add the current form data to the FamilyList

    // Reset the form data
    setEmergencyFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
    setEmergencyFormErrors({});
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
        // console.log(res);
        const updatedList = familyList.filter((_, i) => i !== index);
        setFamilyList(updatedList);
        toast.success(res.data.message);
        getFamilyDetails();
      }
    } catch (error) {}
  };

  // For deleting the form entry entered
  const handleEmergencyDeleteClick = async (index, id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenWithoutQuotes = JSON.parse(accessToken);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteemergencyFamilyMemberDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${accessTokenWithoutQuotes}` },
        }
      );
      if (res) {
        // console.log(res);
        const updatedList = emergencyfamilyList.filter((_, i) => i !== index);
        setEmergencyFamilyList(updatedList);
        toast.success(res.data.message);
        getEmergencyFamilyDetails();
      }
    } catch (error) {}
  };

  // for editing the form and submit the data through this
  const handleSaveEdit = async (id, updatedData) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateFamilyDetails/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res && res.status === 200) {
        const updatedFamilyList = familyList.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        );
        setFamilyList(updatedFamilyList);
        toast.success(res.data.message);
        getFamilyDetails();
      }
    } catch (error) {}
  };

  // for editing the form and submit the data through this
  const handleEmergencySaveEdit = async (id, updatedData) => {
    try {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateemergencyFamilyDetails/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (res && res.status === 200) {
        const updatedFamilyList = familyList.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        );
        setEmergencyFamilyList(updatedFamilyList);
        toast.success(res.data.message);
        getEmergencyFamilyDetails();
      }
    } catch (error) {}
  };
  return (
    <>
      <FamilySection
        title="Family Members"
        emergency={false}
        setShowForm={setShowForm}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        setFormErrors={setFormErrors}
        formData={formData}
        showForm={showForm}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        familyList={familyList}
        handleDeleteClick={handleDeleteClick}
        handleSaveEdit={handleSaveEdit}
      />
      <FamilySection
        title="Emergency Contact"
        emergency={true}
        setShowForm={setEmergencyShowForm}
        setFormData={setEmergencyFormData}
        handleInputChange={handleEmergencyInputChange}
        handleCheckboxChange={handleEmergencyCheckboxChange}
        setFormErrors={setEmergencyFormErrors}
        formData={emergencyformData}
        showForm={emergencyShowForm}
        formErrors={emergencyformErrors}
        handleSubmit={handleEmergencySubmit}
        familyList={emergencyfamilyList}
        handleDeleteClick={handleEmergencyDeleteClick}
        handleSaveEdit={handleEmergencySaveEdit}
      />
    </>
  );
};

export default Family;
