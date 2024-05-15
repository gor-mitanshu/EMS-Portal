import { useCallback, useEffect, useRef, useState } from "react";
import FamilySection from "./FamilySection";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Family = ({ accessToken, userId }) => {
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
  const initialFamilyUser = useRef({
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
  const initialEmergencyFamilyUser = useRef({
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

  const getFamilyDetails = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/getFamilyDetails/${userId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (res) {
      setFamilyList(res.data.familyDetails);
      initialFamilyUser.current = res.data.familyDetails
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getFamilyDetails();
  }, [getFamilyDetails]);

  const getEmergencyFamilyDetails = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/getEmergencyFamilyDetails/${userId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (res) {
      setEmergencyFamilyList(res.data.familyDetails);
      initialEmergencyFamilyUser.current = res.data.familyDetails
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getEmergencyFamilyDetails();
  }, [getEmergencyFamilyDetails]);

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
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addFamilyDetails/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res) {
        // setFamilyList([...familyList, formData]);
        toast.success(res.data.message);
        getFamilyDetails();
      }
    } catch (error) { }
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
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/addemergencyFamilyDetails/${userId}`,
        emergencyformData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res) {
        // emergencyfamilyList([...emergencyfamilyList, emergencyformData]);
        toast.success(res.data.message);
        getEmergencyFamilyDetails();
      }
    } catch (error) { }
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
      Swal.fire({
        title: 'Confirm Delete',
        text: "Are you sure you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `${process.env.REACT_APP_API}/employee/deleteFamilyMemberDetails/${id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (res) {
            toast.success(res.data.message);
            getFamilyDetails();
          }
        } else {
          return;
        }
      })
    } catch (error) { }
  };

  // For deleting the form entry entered
  const handleEmergencyDeleteClick = async (index, id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/employee/deleteEmergencyFamilyMemberDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res) {
        // console.log(res);
        // const updatedList = emergencyfamilyList.filter((_, i) => i !== index);
        // setEmergencyFamilyList(updatedList);
        toast.success(res.data.message);
        getEmergencyFamilyDetails();
      }
    } catch (error) { }
  };

  // for editing the form and submit the data through this
  const handleSaveEdit = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateFamilyDetails/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res && res.status === 200) {
        // const updatedFamilyList = familyList.map((item) =>
        //   item.id === id ? { ...item, ...updatedData } : item
        // );
        // setFamilyList(updatedFamilyList);
        toast.success(res.data.message);
        getFamilyDetails();
      }
    } catch (error) { }
  };

  // for editing the form and submit the data through this
  const handleEmergencySaveEdit = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/employee/updateEmergencyFamilyDetails/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res && res.status === 200) {
        // const updatedFamilyList = familyList.map((item) =>
        //   item.id === id ? { ...item, ...updatedData } : item
        // );
        // setEmergencyFamilyList(updatedFamilyList);
        toast.success(res.data.message);
        getEmergencyFamilyDetails();
      }
    } catch (error) { }
  };

  const hasChanges = (changedData) => {
    return (
      changedData.family_name !== initialFamilyUser.current.family_name ||
      changedData.family_relationship !== initialFamilyUser.current.family_relationship ||
      changedData.family_birth_date !== initialFamilyUser.current.family_birth_date ||
      changedData.dependant !== initialFamilyUser.current.dependant);
  };

  const hasEmergencyChanges = (changedData) => {
    return (
      changedData.family_name !== initialFamilyUser.current.family_name ||
      changedData.family_relationship !== initialFamilyUser.current.family_relationship ||
      changedData.family_birth_date !== initialFamilyUser.current.family_birth_date ||
      changedData.dependant !== initialFamilyUser.current.dependant
    );
  };
  return (
    <>
      <FamilySection
        title="Family Members"
        emergency={ false }
        setShowForm={ setShowForm }
        setFormData={ setFormData }
        handleInputChange={ handleInputChange }
        handleCheckboxChange={ handleCheckboxChange }
        setFormErrors={ setFormErrors }
        formData={ formData }
        showForm={ showForm }
        formErrors={ formErrors }
        handleSubmit={ handleSubmit }
        familyList={ familyList }
        handleDeleteClick={ handleDeleteClick }
        handleSaveEdit={ handleSaveEdit }
        hasChanges={ hasChanges }
      />
      <FamilySection
        title="Emergency Contact"
        emergency={ true }
        setShowForm={ setEmergencyShowForm }
        setFormData={ setEmergencyFormData }
        handleInputChange={ handleEmergencyInputChange }
        handleCheckboxChange={ handleEmergencyCheckboxChange }
        setFormErrors={ setEmergencyFormErrors }
        formData={ emergencyformData }
        showForm={ emergencyShowForm }
        formErrors={ emergencyformErrors }
        handleSubmit={ handleEmergencySubmit }
        familyList={ emergencyfamilyList }
        handleDeleteClick={ handleEmergencyDeleteClick }
        handleSaveEdit={ handleEmergencySaveEdit }
        hasChanges={ hasEmergencyChanges }
      />
    </>
  );
};

export default Family;
