import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import OverViewForm from "./OverViewForm";
import OverViewItem from "./OverViewItem";
import SocialProfile from "../../ProfileTab/Profile/SocialProfile/SocialProfile";
import SocialProfileForm from "../../ProfileTab/Profile/SocialProfile/SocialProfileForm";

const Overview = () => {
  const [editMode, setEditMode] = useState({
    overview: false,
    socialProfiles: false,
  });

  const [formData, setFormData] = useState({
    register_company: "",
    brand_name: "",
    company_official_email: "",
    company_official_contact: "",
    website: "",
    domain_name: "",
    industry_type: "",
    linked_in: "",
    facebook: "",
    twitter: "",
  });

  const [formErrors, setFormErrors] = useState({
    register_company: "",
    brand_name: "",
    company_official_email: "",
    company_official_contact: "",
    website: "",
    domain_name: "",
    industry_type: "",
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
    if (section === "overview") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        register_company: "",
        brand_name: "",
        company_official_email: "",
        company_official_contact: "",
        website: "",
        domain_name: "",
        industry_type: "",
      }));
    }
  };

  // Update the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Personal Profile Section
    if (editMode.overview) {
      if (!formData.register_company) {
        errors.register_company = "Register Company Name is required";
      }
      if (!formData.brand_name) {
        errors.brand_name = "Brand Name is required";
      }
      if (!formData.company_official_email) {
        errors.company_official_email = "Company's Official Name is required";
      }
      if (!formData.company_official_contact) {
        errors.company_official_contact = "Company's Contact is required";
      }
      if (!formData.website) {
        errors.website = "Website URL is required";
      }
      if (!formData.domain_name) {
        errors.domain_name = "Domain is required";
      }
      if (!formData.industry_type) {
        errors.industry_type = "Industry Type is required";
      }
    }

    setFormErrors(errors);
    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      // alert("Form submitted successfully!");
      setEditMode({
        overview: false,
        socialProfiles: false,
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-12">
            {/* Personal Profile */}
            <ProfileField
              title="Overview"
              editMode={editMode.overview}
              handleEditClick={() => handleEditClick("overview")}
              handleCancelClick={() => handleCancelClick("overview")}
            >
              {editMode.overview ? (
                <>
                  <OverViewForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                  />
                </>
              ) : (
                <OverViewItem formData={formData} />
              )}
            </ProfileField>
          </div>

          {/* Card 2 */}
          <div className="col-md-12">
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

export default Overview;
