import React, { useEffect, useState } from "react";
import PersonalProfileForm from "./personalProfile/PersonalProfileForm";
import User from "../../../assets/images/user.jpg";
import ContactInformationForm from "./contactInformation/ContactInformationForm";
import AddressForm from "./address/AddressForm";
import SocialProfileForm from "../../../UI/socialForm/SocialProfileForm";
import axios from "axios";
import Card from "../../../UI/profileCards/ProfileCard";
import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  const [editMode, setEditMode] = useState({
    personalProfile: false,
    contactInformation: false,
    address: false,
    socialProfiles: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birth_date: "",
    gender: "",
    blood_group: "",
    marital_status: "",
    email: "",
    phone: "",
    current_address: "",
    linked_in: "",
    facebook: "",
    twitter: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    birth_date: "",
    gender: "",
    blood_group: "",
    marital_status: "",
    email: "",
    phone: "",
    current_address: "",
    // linked_in: "",
    // facebook: "",
    // twitter: "",
  });

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

  // Get the User
  const getUser = async () => {
    const accessToken = localStorage.getItem("token");
    const accessTokenwithoutQuotes = JSON.parse(accessToken);
    if (accessToken) {
      const res = await axios.get(`${process.env.REACT_APP_API}/getprofile`, {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      });
      const { user } = res.data;
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        birth_date: user.birth_date,
        gender: user.gender,
        blood_group: user.blood_group,
        marital_status: user.marital_status,
        email: user.email,
        phone: user.phone,
        current_address: user.current_address,
        linked_in: user.linked_in,
        facebook: user.facebook,
        twitter: user.twitter,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Handle Edit Click
  const handleEditClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: true,
    }));
  };

  //Handle Cancel Click
  const handleCancelClick = (section) => {
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
    //  else if (section === "socialProfiles") {
    //   setFormErrors((prevFormErrors) => ({
    //     ...prevFormErrors,
    //     linked_in: "",
    //     facebook: "",
    //     twitter: "",
    //   }));
    // }
  };

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
    // Social Profiles Section
    // if (editMode.socialProfiles) {
    //   if (!formData.linked_in) {
    //     errors.linked_in = "LinkedIn profile is required";
    //   }
    //   if (!formData.facebook) {
    //     errors.facebook = "Facebook profile is required";
    //   }
    //   if (!formData.twitter) {
    //     errors.twitter = "Twitter profile is required";
    //   }
    // }
    setFormErrors(errors);
    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      try {
        const accessToken = localStorage.getItem("token");
        const accessTokenwithoutQuotes = JSON.parse(accessToken);
        const { user } = JSON.parse(
          atob(accessTokenwithoutQuotes.split(".")[1])
        );

        if (accessToken) {
          await axios.put(
            `${process.env.REACT_APP_API}/updateprofile/${user._id}`,
            formData,
            {
              headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
            }
          );
          // console.log(formData);
          // alert("Form submitted successfully!");
          setEditMode({
            personalProfile: false,
            contactInformation: false,
            address: false,
            socialProfiles: false,
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const formatedDate = formData.birth_date;
  const newDate = new Date(formatedDate);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-6">
            {/* Personal Profile */}
            <Card
              title="Personal Profile"
              editMode={editMode.personalProfile}
              handleEditClick={() => handleEditClick("personalProfile")}
              handleCancelClick={() => handleCancelClick("personalProfile")}
            >
              {editMode.personalProfile ? (
                <>
                  <PersonalProfileForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                  />
                </>
              ) : (
                <div className="user-details d-flex align-items-center flex-wrap">
                  <div className="py-4 py-xl-0 col-12 col-xl-5 text-center">
                    <img
                      src={User}
                      alt="User"
                      className="h-100 w-75 rounded-circle"
                    />
                  </div>
                  <div className="col-12 col-xl-7">
                    <p>
                      <strong>Name: </strong>{" "}
                      {formData.firstName && formData.lastName
                        ? formData.firstName + " " + formData.lastName
                        : "-"}
                    </p>
                    <p>
                      <strong>Date of Birth: </strong>{" "}
                      {formData.birth_date
                        ? newDate.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </p>
                    <p>
                      <strong>Gender: </strong>
                      {formData.gender ? formData.gender : "-"}
                    </p>
                    <p>
                      <strong>Blood Group: </strong>
                      {formData.blood_group ? formData.blood_group : "-"}
                    </p>
                    <p>
                      <strong>Marital Status: </strong>
                      {formData.marital_status ? formData.marital_status : "-"}
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Contact Information */}
            <Card
              title="Contact Information"
              // editMode={editMode.contactInformation}
              // handleEditClick={() => handleEditClick("contactInformation")}
              // handleCancelClick={() => handleCancelClick("contactInformation")}
            >
              {editMode.contactInformation ? (
                <>
                  <ContactInformationForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {formData.phone}
                  </p>
                </>
              )}
            </Card>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            {/* Address */}
            <Card
              title="Address"
              editMode={editMode.address}
              handleEditClick={() => handleEditClick("address")}
              handleCancelClick={() => handleCancelClick("address")}
            >
              {editMode.address ? (
                <>
                  <AddressForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <p>
                    {formData.current_address ? formData.current_address : "-"}
                  </p>
                </>
              )}
            </Card>

            {/* Social profiles */}
            <Card
              title="Social Profiles"
              editMode={editMode.socialProfiles}
              handleEditClick={() => handleEditClick("socialProfiles")}
              handleCancelClick={() => handleCancelClick("socialProfiles")}
            >
              {editMode.socialProfiles ? (
                <>
                  <SocialProfileForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <div className="d-flex">
                    <a
                      href={
                        formData.linked_in
                          ? `//${formData.linked_in}`
                          : "https://linkedin.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
                    </a>

                    <a
                      href={
                        formData.facebook
                          ? `//${formData.facebook}`
                          : "https://linkedin.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="2xl" />
                    </a>

                    <a
                      href={
                        formData.twitter
                          ? `//${formData.twitter}`
                          : "https://linkedin.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="2xl" />
                    </a>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
