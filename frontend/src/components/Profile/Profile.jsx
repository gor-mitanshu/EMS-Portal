import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import User from "../../assets/user.jpg";

function Profile() {
  const [editMode, setEditMode] = useState({
    personalProfile: false,
    contactInformation: false,
    address: false,
    socialProfiles: false,
  });

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Personal Info */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title">Personal Profile</h5>
              {editMode.personalProfile ? (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleCancelClick("personalProfile")}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              ) : (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleEditClick("personalProfile")}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              )}
            </div>
            <div className="card-body">
              {editMode.personalProfile ? (
                <>
                  <img
                    src={User}
                    alt="User"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Date of Birth"
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Gender"
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Blood Group"
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Marital Status"
                    />
                    <button className="btn btn-primary mr-2">Save</button>
                    {/* <button
                      className="btn btn-secondary"
                      onClick={() => handleCancelClick("personalProfile")}
                    >
                      Cancel
                    </button> */}
                  </div>
                </>
              ) : (
                <div className="user-details">
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
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title">Contact Information</h5>
              {editMode.contactInformation ? (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleCancelClick("contactInformation")}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              ) : (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleEditClick("contactInformation")}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              )}
            </div>
            <div className="card-body">
              {editMode.contactInformation ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Phone Number"
                  />
                  <button className="btn btn-primary mr-2">Save</button>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => handleCancelClick("contactInformation")}
                  >
                    Cancel
                  </button> */}
                </>
              ) : (
                <>
                  <p>
                    <strong>Email:</strong>gor.mitanshu3@gmail.com
                  </p>
                  <p>
                    <strong>Phone Number:</strong> 9558993690
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title">Address</h5>
              {editMode.address ? (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleCancelClick("address")}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              ) : (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleEditClick("address")}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              )}
            </div>
            <div className="card-body">
              {editMode.address ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="City"
                  />
                  <button className="btn btn-primary mr-2">Save</button>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => handleCancelClick("address")}
                  >
                    Cancel
                  </button> */}
                </>
              ) : (
                <>
                  <p>-</p>
                  <p>-</p>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title">Social Profiles</h5>
              {editMode.socialProfiles ? (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleCancelClick("socialProfiles")}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              ) : (
                <button
                  className="btn btn-link edit-button"
                  onClick={() => handleEditClick("socialProfiles")}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              )}
            </div>
            <div className="card-body">
              {editMode.socialProfiles ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="LinkedIn Profile"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Facebook Profile"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Twitter Profile"
                  />
                  <button className="btn btn-primary mr-2">Save</button>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => handleCancelClick("socialProfiles")}
                  >
                    Cancel
                  </button> */}
                </>
              ) : (
                <>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a href="/">linkedin.com/gor-mitanshu</a>
                  </p>
                  <p>
                    <strong>Facebook:</strong>{" "}
                    <a href="/">facebook.com/gor-mitanshu</a>
                  </p>
                  <p>
                    <strong>Twitter:</strong>{" "}
                    <a href="/">twitter.com/gor-mitanshu</a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
