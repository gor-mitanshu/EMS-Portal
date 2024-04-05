import React, { useEffect, useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import PersonalProfileForm from "./PersonalProfile/PersonalProfileForm";
import PersonalProfile from "./PersonalProfile/PersonalProfile";
import ContactInformationForm from "./ContactInformation/ContactInformationForm";
import ContactInformation from "./ContactInformation/ContactInformation";
import AddressForm from "./Address/AddressForm";
import SocialProfileForm from "./SocialProfile/SocialProfileForm";
import SocialProfile from "./SocialProfile/SocialProfile";
import axios from "axios";

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

  // Get the User
  useEffect(() => {
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
    getUser();
  }, []);

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

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-6">
            {/* Personal Profile */}
            <ProfileField
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
                <PersonalProfile formData={formData} />
              )}
            </ProfileField>

            {/* Contact Information */}
            <ProfileField
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
                  <ContactInformation formData={formData} />
                </>
              )}
            </ProfileField>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            {/* Address */}
            <ProfileField
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
            </ProfileField>

            {/* Social profiles */}
            <ProfileField
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
                  <SocialProfile formData={formData} />
                </>
              )}
            </ProfileField>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
