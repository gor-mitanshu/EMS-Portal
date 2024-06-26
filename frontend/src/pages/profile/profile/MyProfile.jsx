import React, { useCallback, useEffect, useRef, useState } from "react";
import PersonalProfileForm from "./personalProfile/PersonalProfileForm";
import User from "../../../assets/images/user.jpg";
import ContactInformationForm from "./contactInformation/ContactInformationForm";
import AddressForm from "./address/AddressForm";
import SocialProfileForm from "../../../UI/socialForm/SocialProfileForm";
import axios from "axios";
import Card from "../../../UI/card/Card";
import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify'
import Swal from "sweetalert2";

const profileInitialState = {
  firstName: "",
  lastName: "",
  birth_date: "",
  gender: "",
  blood_group: "",
  marital_status: "",
  email: "",
  phone: "",
  current_address: "",
}
const socialInitialState = {
  linked_in: "",
  facebook: "",
  twitter: "",
}
const Profile = ({ accessToken, userId }) => {
  const [editMode, setEditMode] = useState({
    personalProfile: false,
    contactInformation: false,
    address: false,
    socialProfiles: false,
  });

  const [formData, setFormData] = useState({
    ...profileInitialState, ...socialInitialState
  });
  const [user, setUser] = useState({})
  const initialUser = useRef({
    ...profileInitialState, ...socialInitialState
  });
  const [formErrors, setFormErrors] = useState(profileInitialState);

  // Handle Change
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

  // Handle Edit Click
  const handleEditClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: true,
    }));
  };

  //Handle Cancel Click
  const handleCancelClick = (section) => {
    if (hasChanges(formData)) {
      Swal.fire({
        title: "Are you sure?",
        text: "Changes will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Don't Save!",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData(user)
          setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [section]: false,
          }));

          // Reset validation errors for all fields in the specific card
          if (section === "personalProfile") {
            setFormErrors((prevFormErrors) => ({
              ...prevFormErrors,
              firstName: "",
              lastName: "",
              birth_date: "",
              gender: "",
              blood_group: "",
              marital_status: "",
            }));
          } else if (section === "contactInformation") {
            setFormErrors((prevFormErrors) => ({
              ...prevFormErrors,
              email: "",
              phone: "",
            }));
          } else if (section === "address") {
            setFormErrors((prevFormErrors) => ({
              ...prevFormErrors,
              current_address: "",
            }));
          }
        }
      });
    } else {
      setFormData(user)
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [section]: false,
      }));

      // Reset validation errors for all fields in the specific card
      if (section === "personalProfile") {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          firstName: "",
          lastName: "",
          birth_date: "",
          gender: "",
          blood_group: "",
          marital_status: "",
        }));
      } else if (section === "contactInformation") {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          email: "",
          phone: "",
        }));
      } else if (section === "address") {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          current_address: "",
        }));
      }
    }
  };

  // Get the User
  const getUser = useCallback(async () => {
    if (accessToken) {
      const res = await axios.get(`${process.env.REACT_APP_API}/user/getUserDetails/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { userData } = res.data;
      setFormData(userData);
      setUser(userData);
      initialUser.current = userData
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  // Update the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Personal Profile Section
    if (editMode.personalProfile) {
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
      }
      if (!formData.birth_date) {
        errors.birth_date = "Date of birth is required";
      }
      if (!formData.gender) {
        errors.gender = "Gender is required";
      }
      if (!formData.blood_group.trim()) {
        errors.blood_group = "Blood group is required";
      }
      if (!formData.marital_status.trim()) {
        errors.marital_status = "Marital status is required";
      }
    }
    // Contact Information Section
    if (editMode.contactInformation) {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email address";
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = "Phone number must be 10 digits";
      }
    }
    // Address Section
    if (editMode.address) {
      if (!formData.current_address) {
        errors.current_address = "Address is required";
      }
    }

    setFormErrors(errors);
    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      try {
        if (accessToken) {
          const response = await axios.put(
            `${process.env.REACT_APP_API}/user/updateUserDetails/${userId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (response) {
            toast.success(response.data.message);
            getUser();
            setEditMode({
              personalProfile: false,
              contactInformation: false,
              address: false,
              socialProfiles: false,
            });
          }
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };
  const hasChanges = (changedData) => {
    return (
      changedData.firstName !== initialUser.current.firstName ||
      changedData.lastName !== initialUser.current.lastName ||
      changedData.birth_date !== initialUser.current.birth_date ||
      changedData.gender !== initialUser.current.gender ||
      changedData.blood_group !== initialUser.current.blood_group ||
      changedData.marital_status !== initialUser.current.marital_status ||
      changedData.email !== initialUser.current.email ||
      changedData.phone !== initialUser.current.phone ||
      changedData.current_address !== initialUser.current.current_address ||
      changedData.linked_in !== initialUser.current.linked_in ||
      changedData.facebook !== initialUser.current.facebook ||
      changedData.twitter !== initialUser.current.twitter
    );
  };

  const formatedDate = user.birth_date;
  const newDate = new Date(formatedDate);
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="row">
          {/* Card 1 */ }
          <div className="col-md-6">
            {/* Personal Profile */ }
            <Card
              title="Personal Profile"
              editMode={ editMode.personalProfile }
              handleEditClick={ () => handleEditClick("personalProfile") }
              handleCancelClick={ () => handleCancelClick("personalProfile") }
            >
              { editMode.personalProfile ? (
                <>
                  <PersonalProfileForm
                    formData={ formData }
                    formErrors={ formErrors }
                    handleInputChange={ handleInputChange }
                    hasChanges={ hasChanges }
                    handleCancel={ () => handleCancelClick("personalProfile") }
                  />
                </>
              ) : (
                <div className="user-details d-flex align-items-center flex-wrap">
                  <div className="py-4 py-xl-0 col-12 col-xl-5 text-center">
                    <img
                      src={ User }
                      alt="User"
                      className="h-100 w-75 rounded-circle"
                    />
                  </div>
                  <div className="col-12 col-xl-7">
                    <p>
                      <strong>Name: </strong>{ " " }
                      { user.firstName && user.lastName
                        ? user.firstName + " " + user.lastName
                        : "-" }
                    </p>
                    <p>
                      <strong>Date of Birth: </strong>{ " " }
                      { user.birth_date
                        ? newDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        : "-" }
                    </p>
                    <p>
                      <strong>Gender: </strong>
                      { user.gender ? user.gender : "-" }
                    </p>
                    <p>
                      <strong>Blood Group: </strong>
                      { user.blood_group ? user.blood_group : "-" }
                    </p>
                    <p>
                      <strong>Marital Status: </strong>
                      { user.marital_status ? user.marital_status : "-" }
                    </p>
                  </div>
                </div>
              ) }
            </Card>

            {/* Contact Information */ }
            <Card
              title="Contact Information"
            // editMode={editMode.contactInformation}
            // handleEditClick={() => handleEditClick("contactInformation")}
            // handleCancelClick={() => handleCancelClick("contactInformation")}
            >
              { editMode.contactInformation ? (
                <>
                  <ContactInformationForm
                    formData={ formData }
                    formErrors={ formErrors }
                    handleInputChange={ handleInputChange }
                    handleCancel={ () => handleCancelClick("personalProfile") }
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Email:</strong> { user.email }
                  </p>
                  <p>
                    <strong>Phone Number:</strong> { user.phone }
                  </p>
                </>
              ) }
            </Card>
          </div>

          {/* Card 2 */ }
          <div className="col-md-6">
            {/* Address */ }
            <Card
              title="Address"
              editMode={ editMode.address }
              handleEditClick={ () => handleEditClick("address") }
              handleCancelClick={ () => handleCancelClick("address") }
            >
              { editMode.address ? (
                <>
                  <AddressForm
                    formData={ formData }
                    formErrors={ formErrors }
                    handleInputChange={ handleInputChange }
                    handleCancel={ () => handleCancelClick("address") }
                  />
                </>
              ) : (
                <>
                  <p>
                    { user.current_address ? user.current_address : "-" }
                  </p>
                </>
              ) }
            </Card>

            {/* Social profiles */ }
            <Card
              title="Social Profiles"
              editMode={ editMode.socialProfiles }
              handleEditClick={ () => handleEditClick("socialProfiles") }
              handleCancelClick={ () => handleCancelClick("socialProfiles") }
            >
              { editMode.socialProfiles ? (
                <>
                  <SocialProfileForm
                    formData={ formData }
                    formErrors={ formErrors }
                    handleInputChange={ handleInputChange }
                    handleCancel={ () => handleCancelClick("socialProfiles") }
                  />
                </>
              ) : (
                <>
                  <div className="d-flex">
                    <a
                      href={
                        user.linked_in
                          ? `//${user.linked_in}`
                          : "https://linkedin.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={ faLinkedinIn } size="2xl" />
                    </a>

                    <a
                      href={
                        user.facebook
                          ? `//${user.facebook}`
                          : "https://linkedin.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={ faFacebook } size="2xl" />
                    </a>

                    <a
                      href={
                        user.twitter
                          ? `//${user.twitter}`
                          : "https://linkedin.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={ faTwitter } size="2xl" />
                    </a>
                  </div>
                </>
              ) }
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
