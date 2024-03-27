import React, { useState } from "react";
import "./Profile.css";
import User from "../../assets/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    linked_in: "",
    facebook: "",
    twitter: "",
  });

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

  const handleEditClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: true,
    }));
  };

  const handleCancelClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: false,
    }));
  };

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault();

    let errors = {};

    // Validate each field
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
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
    if (!formData.current_address.trim()) {
      errors.current_address = "Address is required";
    }
    if (!formData.linked_in.trim()) {
      errors.linked_in = "LinkedIn profile is required";
    }
    if (!formData.facebook.trim()) {
      errors.facebook = "Facebook profile is required";
    }
    if (!formData.twitter.trim()) {
      errors.twitter = "Twitter profile is required";
    }

    setFormErrors(errors);

    // If there are no errors, you can submit the form
    if (Object.keys(errors).length === 0) {
      // Add your submit logic here
      alert("Form submitted successfully!");
    }
  };
  console.log(editMode);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let error = "";

  //   if (name === "firstName" && !value.trim()) {
  //     error = "First name is required";
  //   } else if (name === "lastName" && !value.trim()) {
  //     error = "Last name is required";
  //   } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
  //     error = "Invalid email address";
  //   } else if (name === "phone" && !/^\d{10}$/.test(value)) {
  //     error = "Phone number must be 10 digits";
  //   } else if (name === "birth_date" && !value) {
  //     error = "Date of birth is required";
  //   } else if (name === "gender" && !value) {
  //     error = "Gender is required";
  //   } else if (name === "blood_group" && !value.trim()) {
  //     error = "Blood group is required";
  //   } else if (name === "marital_status" && !value.trim()) {
  //     error = "Marital status is required";
  //   } else if (name === "current_address" && !value.trim()) {
  //     error = "Address is required";
  //   } else if (name === "linked_in" && !value.trim()) {
  //     error = "LinkedIn profile is required";
  //   } else if (name === "facebook" && !value.trim()) {
  //     error = "Facebook profile is required";
  //   } else if (name === "twitter" && !value.trim()) {
  //     error = "Twitter profile is required";
  //   }
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });

  //   setFormErrors({
  //     ...formErrors,
  //     [name]: error,
  //   });
  //   // console.log(formData);
  // };
  // console.log(formErrors);
  // console.log(editMode.personalProfile);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-6">
            {/* Personal Profile */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">Personal Profile</h5>
                {editMode.personalProfile ? (
                  <button
                    className="btn btn-link edit-button"
                    onClick={() => handleCancelClick("personalProfile")}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-link edit-button"
                    onClick={() => handleEditClick("personalProfile")}
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      size="lg"
                      color=" rgb(25, 113, 114)"
                    />
                  </button>
                )}
              </div>
              <div className="card-body">
                {editMode.personalProfile ? (
                  <>
                    <div className="pb-3 text-center">
                      <img
                        src={User}
                        alt="User"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        {/* Firstname */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Firstname"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                              />
                              {formErrors.firstName && (
                                <small className="text-danger">
                                  {formErrors.firstName}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* lastname */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Lastname"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                              />
                              {formErrors.lastName && (
                                <small className="text-danger">
                                  {formErrors.lastName}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Date of Birth */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-2">
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Date of Birth"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleInputChange}
                              />
                              {formErrors.birth_date && (
                                <small className="text-danger">
                                  {formErrors.birth_date}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Gender */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-2">
                              <label className="form-label">Gender:</label>
                              <div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleInputChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
                                    Male
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleInputChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
                                    Female
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    value="other"
                                    checked={formData.gender === "other"}
                                    onChange={handleInputChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="other"
                                  >
                                    Other
                                  </label>
                                </div>
                                {formErrors.gender && (
                                  <small className="text-danger">
                                    {formErrors.gender}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Blood Group */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Blood Group"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleInputChange}
                              />
                              {formErrors.blood_group && (
                                <small className="text-danger">
                                  {formErrors.blood_group}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Marital Status */}
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Marital Status"
                                name="marital_status"
                                value={formData.marital_status}
                                onChange={handleInputChange}
                              />
                              {formErrors.marital_status && (
                                <small className="text-danger">
                                  {formErrors.marital_status}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary mr-2">
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="user-details d-flex justify-content-evenly align-items-center flex-wrap">
                    <div className="pb-sm-3">
                      <img
                        src={User}
                        alt="User"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div>
                      <p>
                        <strong>Name:</strong> Gor Mitanshu
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> January 3, 2002
                      </p>
                      <p>
                        <strong>Gender:</strong> Male
                      </p>
                      <p>
                        <strong>Blood Group:</strong> B+
                      </p>
                      <p>
                        <strong>Marital Status:</strong> Single
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">Contact Information</h5>
                {editMode.contactInformation ? (
                  <button
                    className="btn btn-link edit-button"
                    onClick={() => handleCancelClick("contactInformation")}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-link edit-button"
                    onClick={() => handleEditClick("contactInformation")}
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      size="lg"
                      color=" rgb(25, 113, 114)"
                    />
                  </button>
                )}
              </div>
              <div className="card-body">
                {editMode.contactInformation ? (
                  <>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <div className="col mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {formErrors.email && (
                              <small className="text-danger">
                                {formErrors.email}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group row">
                          <div className="col mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            {formErrors.phone && (
                              <small className="text-danger">
                                {formErrors.phone}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary mr-2">Save</button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Email:</strong> gor.mitanshu3@gmail.com
                    </p>
                    <p>
                      <strong>Phone Number:</strong> 9558993690
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            {/* Address */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">Address</h5>
                {editMode.address ? (
                  <button
                    className="btn btn-link edit-button"
                    onClick={() => handleCancelClick("address")}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-link edit-button"
                    onClick={() => handleEditClick("address")}
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      size="lg"
                      color=" rgb(25, 113, 114)"
                    />
                  </button>
                )}
              </div>
              <div className="card-body">
                {editMode.address ? (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <div className="col mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              name="current_address"
                              value={formData.current_address}
                              onChange={handleInputChange}
                            />
                            {formErrors.current_address && (
                              <small className="text-danger">
                                {formErrors.current_address}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="City"
                    onChange={handleInputChange}
                  /> */}
                    <button className="btn btn-primary mr-2">Save</button>
                  </>
                ) : (
                  <>
                    <p>-</p>
                  </>
                )}
              </div>
            </div>

            {/* Social profiles */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">Social Profiles</h5>
                {editMode.socialProfiles ? (
                  <button
                    className="btn btn-link edit-button"
                    onClick={() => handleCancelClick("socialProfiles")}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-link edit-button"
                    onClick={() => handleEditClick("socialProfiles")}
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      size="lg"
                      color=" rgb(25, 113, 114)"
                    />
                  </button>
                )}
              </div>
              <div className="card-body">
                {editMode.socialProfiles ? (
                  <>
                    <div className="col mb-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          size="xl"
                          className="pe-3"
                          color="blue"
                          style={{ height: "21px", width: "21px" }}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="LinkedIn Profile"
                          name="linked_in"
                          value={formData.linked_in}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.linked_in && (
                        <small className="text-danger">
                          {formErrors.linked_in}
                        </small>
                      )}
                    </div>
                    <div className="col mb-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          size="xl"
                          className="pe-3"
                          color="blue"
                          style={{ height: "21px", width: "21px" }}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Facebook Profile"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.facebook && (
                        <small className="text-danger">
                          {formErrors.facebook}
                        </small>
                      )}
                    </div>
                    <div className="col mb-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="xl"
                          className="pe-3"
                          color="blue"
                          style={{ height: "21px", width: "21px" }}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Twitter Profile"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.twitter && (
                        <small className="text-danger">
                          {formErrors.twitter}
                        </small>
                      )}
                    </div>
                    <button className="btn btn-primary mr-2">Save</button>
                  </>
                ) : (
                  <>
                    <div className="d-flex">
                      <a href="/" className="pe-4">
                        <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
                      </a>

                      <a href="/" className="pe-4">
                        <FontAwesomeIcon icon={faFacebook} size="2xl" />
                      </a>

                      <a href="/" className="pe-4">
                        <FontAwesomeIcon icon={faTwitter} size="2xl" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
