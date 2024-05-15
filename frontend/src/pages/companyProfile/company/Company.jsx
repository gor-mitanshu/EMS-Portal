import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import OverViewForm from "./CompanyForm";
import SocialProfileForm from "../../../UI/socialForm/SocialProfileForm";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import Card from "../../../UI/card/Card";

const initialCompanyData = {
  company_name: "",
  brand_name: "",
  company_official_email: "",
  company_official_contact: "",
  website: "",
  domain_name: "",
  industry_type: "",
  company_address: ""
}
const initialSocialData = {
  linked_in: "",
  facebook: "",
  twitter: "",
}
const Overview = ({ companyId, accessToken }) => {
  const [editMode, setEditMode] = useState({
    overview: false,
    socialProfiles: false,
    companyAddress: false
  });
  const [companyData, setCompanyData] = useState({});
  const [formData, setFormData] = useState({ ...initialCompanyData, ...initialSocialData });
  const [formErrors, setFormErrors] = useState(initialCompanyData);
  const initialUser = useRef({
    ...initialCompanyData, ...initialSocialData
  })

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

  const getCompanyDetails = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/company/getCompanyDetailsById/${companyId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (response) {
      const { company } = response.data;
      setFormData(company);
      setCompanyData(company);
      initialUser.current = company;
    } else {
      console.log(response);
    }
  }, [accessToken, companyId]);

  useEffect(() => {
    (companyId && accessToken) && getCompanyDetails();
  }, [accessToken, companyId, getCompanyDetails]);

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
          setFormData(companyData)
          setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [section]: false,
          }));

          // Reset validation errors for all fields in the specific card
          if (section === "overview") {
            setFormErrors((prevFormErrors) => ({
              ...prevFormErrors,
              ...initialCompanyData
            }));
          }
        }
      });
    } else {
      setFormData(companyData)
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [section]: false,
      }));

      // Reset validation errors for all fields in the specific card
      if (section === "overview") {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          ...initialCompanyData
        }));
      }
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
      if (!formData.company_name) {
        errors.company_name = "Company Name is required";
      }
      if (!formData.brand_name) {
        errors.brand_name = "Brand Name is required";
      }
      if (!formData.company_official_email) {
        errors.company_official_email = "Company's Official Email is required";
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

    if (editMode.companyAddress) {
      if (!formData.company_address) {
        errors.company_address = "Company address is required";
      }
    }

    setFormErrors(errors);
    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/company/updateCompanyDetails/${companyId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        toast.success(response.data.message);
        getCompanyDetails();
      }
      // alert("Form submitted successfully!");
      setEditMode({
        overview: false,
        socialProfiles: false,
        companyAddress: false,
      });
    }
  };

  const hasChanges = (changedData) => {
    return (
      changedData.company_name !== initialUser.current.company_name ||
      changedData.brand_name !== initialUser.current.brand_name ||
      changedData.company_official_email !== initialUser.current.company_official_email ||
      changedData.company_official_contact !== initialUser.current.company_official_contact ||
      changedData.website !== initialUser.current.website ||
      changedData.domain_name !== initialUser.current.domain_name ||
      changedData.industry_type !== initialUser.current.industry_type ||
      changedData.company_address !== initialUser.current.company_address ||
      changedData.linked_in !== initialUser.current.linked_in ||
      changedData.facebook !== initialUser.current.facebook ||
      changedData.twitter !== initialUser.current.twitter
    );
  };
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="row">
          {/* Company Details */ }
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
                    formData={ formData }
                    formErrors={ formErrors }
                    handleInputChange={ handleInputChange }
                    hasChanges={ hasChanges }
                    handleCancelClick={ () => handleCancelClick("overview") }
                  />
                </>
              ) : (
                <>
                  { formData ?
                    <div className="user-details mt-2">
                      <div className="row">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Company Name
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.company_name }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Brand Name
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.brand_name }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Email
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.company_official_email }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Contact
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.company_official_contact }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Website
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.website }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Domain Name
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.domain_name }
                        </h6>
                      </div>
                      <div className="row mt-4">
                        <h6 className="text-black fw-bold text-truncate col-12 col-md-5">
                          Industry Type
                        </h6>
                        <h6 className="text-gray text-truncate col-12 col-md-7">
                          { companyData.industry_type }
                        </h6>
                      </div>
                    </div> :
                    <h3>No data found</h3>
                  }
                </>
              ) }
            </Card>
          </div>

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
                    handleCancel={ () => handleCancelClick("socialProfiles") }
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
                      <FontAwesomeIcon icon={ faLinkedinIn } color="#0077B5" size="2xl" />
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

            {/* Address */ }
            <Card
              title={ "Company Address" }
              editMode={ editMode.companyAddress }
              handleEditClick={ () => handleEditClick('companyAddress') }
              handleCancelClick={ () => handleCancelClick('companyAddress') }

            >
              { editMode.companyAddress ? (
                <div>
                  <div
                    className={ `form-input-wrapper ${formErrors.company_address ? "error-form-input" : ""
                      }` }
                  >
                    <label htmlFor="company_address" className="fw-medium">Current Address</label>
                    <textarea
                      type="text"
                      className="form-input px-0"
                      placeholder="Enter Full Address"
                      name="company_address"
                      value={ formData.company_address }
                      rows={ 3 }
                      onChange={ handleInputChange }
                    />
                  </div>
                  <div className="input-error">{ formErrors.company_address }</div>
                  <button className="btn btn-danger me-2 px-4" type="button" onClick={ () => handleCancelClick('companyAddress') }>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4">Save</button>
                </div>
              ) : (
                <span>
                  { formData.company_address
                    ? formData.company_address
                    : <h3>No Data Found!</h3> }
                </span>
              ) }
            </Card>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Overview;
