import React, { useEffect, useState } from "react";
import axios from "axios";
import OverViewForm from "./OverViewForm";
import SocialProfileForm from "../../../UI/socialForm/SocialProfileForm";
import { toast } from "react-toastify";
import Card from "../../../UI/profileCards/ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

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

  const getCompanyDetails = async () => {
    const accessToken = localStorage.getItem("token");
    const accessTokenwithoutQuotes = JSON.parse(accessToken);
    const { user } = JSON.parse(atob(accessTokenwithoutQuotes.split(".")[1]));
    const response = await axios.get(
      `${process.env.REACT_APP_API}/company/getOverview/${user._id}`,
      {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      }
    );
    const { company } = response.data;
    setFormData(company);
  };

  useEffect(() => {
    getCompanyDetails();
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
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const { user } = JSON.parse(atob(accessTokenwithoutQuotes.split(".")[1]));
      const response = await axios.put(
        `${process.env.REACT_APP_API}/company/updateOverview/${user._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
      // alert("Form submitted successfully!");
      setEditMode({
        overview: false,
        socialProfiles: false,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-9">
            {/* Personal Profile */}
            <Card
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
                <>
                  <div className="user-details">
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <strong>Registered Company Name:</strong>{" "}
                          {formData.register_company}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong>Brand Name:</strong> {formData.brand_name}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong>Company Official Email:</strong>{" "}
                          {formData.company_official_email}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <strong>Company Official Contact:</strong>{" "}
                          {formData.company_official_contact}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong>Website:</strong> {formData.website}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong>Domain Name:</strong> {formData.domain_name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Industry Type:</strong>{" "}
                          {formData.industry_type}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Card 2 */}
          <div className="col-md-3 h-100">
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
                  </div>{" "}
                </>
              )}
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Overview;
