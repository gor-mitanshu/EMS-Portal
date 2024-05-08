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

  const [companyData, setComapnyData] = useState({});
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
    if (response) {
      const { company } = response.data;
      if (company) {
        setComapnyData(company);
        setFormData(company);
      }
    } else {
      console.log(response);
    }
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
      <form onSubmit={ handleSubmit }>
        <div className="row">
          {/* Card 1 */ }
          <div className="col-lg-8">
            {/* Personal Profile */ }
            <Card
              title="Company Profile"
              editMode={ editMode.overview }
              handleEditClick={ () => handleEditClick("overview") }
              handleCancelClick={ () => handleCancelClick("overview") }
            >
              { editMode.overview ? (
                <>
                  <OverViewForm
                    formData={ companyData }
                    formErrors={ formErrors }
                    handleInputChange={ handleInputChange }
                  />
                </>
              ) : (
                <>
                  { formData ?
                    <div className="user-details mt-2">
                      <div className="row">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Company Name
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.register_company }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Brand Name
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.brand_name }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Company Email
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.company_official_email }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Company Contact
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.company_official_contact }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Website
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.website }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Domain Name
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.domain_name }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-6">
                          Industry Type
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-6">
                          { companyData.industry_type }
                        </h6>
                      </div>
                    </div> : "No data found"
                  }

                </>
              ) }
            </Card>
          </div>

          {/* Card 2 */ }
          <div className="col-lg-4">
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
                      <FontAwesomeIcon
                        icon={ faLinkedinIn }
                        color="#0077B5"
                        size="2xl"
                      />
                    </a>

                    <a
                      href={
                        formData.facebook
                          ? `//${formData.facebook}`
                          : "https://facebook.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={ faFacebook }
                        color="#316FF6"
                        size="2xl"
                      />
                    </a>

                    <a
                      href={
                        formData.twitter
                          ? `//${formData.twitter}`
                          : "https://twitter.com/in/"
                      }
                      target="_blank"
                      className="pe-4"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={ faTwitter }
                        color="#1DA1F2"
                        size="2xl"
                      />
                    </a>
                  </div>{ " " }
                </>
              ) }
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Overview;
