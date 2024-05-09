import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../../UI/profileCards/ProfileCard";

const initForm = {
  register_office_address: "",
  corporate_office_address: "",
  custom_office_address: "",
}

const Address = () => {
  const [editMode, setEditMode] = useState({
    register_office: false,
    corporate_office: false,
    custom_address_title: false,
  });
  const [addressData, setAddressData] = useState({})
  const [addressForm, setAddressForm] = useState(initForm);

  const [formErrors, setFormErrors] = useState(initForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const getCompanyAddress = async () => {
    const accessToken = localStorage.getItem("token");
    const accessTokenwithoutQuotes = JSON.parse(accessToken);
    const { user } = JSON.parse(atob(accessTokenwithoutQuotes.split(".")[1]));
    const response = await axios.get(
      `${process.env.REACT_APP_API}/company/getCompanyAddress/${user._id}`,
      {
        headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
      }
    );
    const { company } = response.data;
    setAddressData(company);
    setAddressForm(company);
  };

  useEffect(() => {
    getCompanyAddress();
  }, []);

  const handleEditClick = (section) => {
    setEditMode({
      ...editMode,
      [section]: true,
    });
  };

  const handleCancelClick = (section) => {
    setAddressForm(addressData);
    setEditMode({
      ...editMode,
      [section]: false,
    });

    // Reset validation errors for all fields in the specific card
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      ...(section === "register_office" && {
        register_office_address: "",
      }),
      ...(section === "corporate_office" && {
        corporate_office_address: "",
      }),
      ...(section === "custom_address_title" && {
        custom_office_address: "",
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Error Handling
    let errors = {};
    // Validate each field based on the section
    // Current Address
    if (editMode.register_office) {
      if (!addressForm.register_office_address) {
        errors.register_office_address = "Please enter a Address";
      }
    }
    if (editMode.corporate_office) {
      if (!addressForm.corporate_office_address) {
        errors.corporate_office_address = "Please enter a Address";
      }
    }
    if (editMode.custom_address_title) {
      if (!addressForm.custom_office_address) {
        errors.custom_office_address = "Please enter a Address";
      }
    }
    setFormErrors(errors);
    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      const accessToken = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const { user } = JSON.parse(atob(accessTokenwithoutQuotes.split(".")[1]));
      const response = await axios.put(
        `${process.env.REACT_APP_API}/company/updateCompanyAddress/${user._id}`,
        addressForm,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (response) {
        getCompanyAddress()
        toast.success(response.data.message);
      }
      // alert("Form submitted successfully!");
      setEditMode({
        register_office: false,
        corporate_office: false,
        custom_address_title: false,
      });
    }
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <div className="row">
          {/* Card 1 */ }
          <div className="col-md-12">
            <Card
              title={ "Regsiter Office" }
              editMode={ editMode.register_office }
              handleEditClick={ () => handleEditClick("register_office") }
              handleCancelClick={ () => handleCancelClick("register_office") }
            >
              { editMode.register_office ? (
                <div>
                  <div
                    className={ `form-input-wrapper ${formErrors.register_office_address ? "error-form-input" : ""
                      }` }
                  >
                    <label htmlFor="register_office_address" className="fw-medium">Current Address</label>
                    <textarea
                      type="text"
                      className="form-input px-0"
                      placeholder="Enter Full Address"
                      name="register_office_address"
                      value={ addressForm.register_office_address }
                      rows={ 1 }
                      onChange={ handleInputChange }
                    />
                  </div>
                  <div className="input-error">{ formErrors.register_office_address }</div>
                  <button type="submit" className="btn btn-primary px-4">Save</button>
                </div>
              ) : (
                <p>
                  { addressData.register_office_address
                    ? addressData.register_office_address
                    : <h3>No Data Found!</h3> }
                </p>
              ) }
            </Card>
          </div>
          {/* Card 2 */ }
          <div className="col-md-12">
            <Card
              title={ "Corporate Office" }
              editMode={ editMode.corporate_office }
              handleEditClick={ () => handleEditClick("corporate_office") }
              handleCancelClick={ () => handleCancelClick("corporate_office") }
            >
              { editMode.corporate_office ? (
                <div>
                  <div
                    className={ `form-input-wrapper ${formErrors.corporate_office_address ? "error-form-input" : ""
                      }` }
                  >
                    <label
                      htmlFor="corporate_office_address"
                      className="fw-medium"
                    >
                      Corporate Office Address:
                    </label>
                    <textarea
                      type="text"
                      className="form-input px-0"
                      placeholder="Enter Full Address"
                      name="corporate_office_address"
                      value={ addressForm.corporate_office_address }
                      onChange={ handleInputChange }
                      rows={ 1 }
                    />
                  </div>
                  <div className="input-error">{ formErrors.corporate_office_address }</div>
                  <button type="submit" className="btn btn-primary px-4">Save</button>
                </div>
              ) : (
                <p>
                  { addressData.corporate_office_address
                    ? addressData.corporate_office_address
                    : <h3>No Data Found!</h3> }
                </p>
              ) }
            </Card>
          </div>
          {/* Card 3 */ }
          <div className="col-md-12">
            <Card
              title={ "Custom Address" }
              editMode={ editMode.custom_address_title }
              handleEditClick={ () => handleEditClick("custom_address_title") }
              handleCancelClick={ () =>
                handleCancelClick("custom_address_title")
              }
            >
              { editMode.custom_address_title ? (
                <div>
                  <div
                    className={ `form-input-wrapper ${formErrors.custom_office_address ? "error-form-input" : ""
                      }` }
                  >
                    <label
                      htmlFor="custom_office_address"
                      className="fw-medium"
                    >
                      Custom Office Address:
                    </label>
                    <textarea
                      type="text"
                      className="form-input px-0"
                      placeholder="Enter Full Address"
                      name="custom_office_address"
                      value={ addressForm.custom_office_address }
                      onChange={ handleInputChange }
                      rows={ 1 }
                    />
                  </div>
                  <div className="input-error">{ formErrors.custom_office_address }</div>
                  <button type="submit" className="btn btn-primary px-4">Save</button>
                </div>
              ) : (
                <p>
                  { addressData.custom_office_address
                    ? addressData.custom_office_address
                    : <h3>No Data Found!</h3> }
                </p>
              ) }
            </Card>
          </div>
        </div>
      </form>
    </>
  );
};

export default Address;
