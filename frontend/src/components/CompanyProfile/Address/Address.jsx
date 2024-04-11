import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";

const Address = () => {
  const [editMode, setEditMode] = useState({
    register_office: false,
    corporate_office: false,
    custom_address_title: false,
  });

  const [formData, setFormData] = useState({
    register_office_address: "",
    corporate_office_address: "",
    custom_office_address: "",
  });

  const [formErrors, setFormErrors] = useState({
    register_office_address: "",
    corporate_office_address: "",
    custom_office_address: "",
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
    setEditMode({
      ...editMode,
      [section]: true,
    });
  };

  const handleCancelClick = (section) => {
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
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-12">
              <ProfileField
                title={"Regsiter Office"}
                editMode={editMode.register_office}
                handleEditClick={() => handleEditClick("register_office")}
                handleCancelClick={() => handleCancelClick("register_office")}
              >
                {editMode.register_office ? (
                  <div className="form-group row">
                    <div className="col mb-10">
                      <label
                        htmlFor="register_office_address"
                        className="font-weight-bold"
                      >
                        Current Address:
                      </label>
                      <textarea
                        type="text"
                        className="form-control no-focus-box-shadow"
                        placeholder="Enter Full Address"
                        name="register_office_address"
                        value={formData.register_office_address}
                        onChange={handleInputChange}
                        style={{ height: "150px" }}
                      />
                      {formErrors.register_office_address && (
                        <small className="text-danger">
                          {formErrors.register_office_address}
                        </small>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>
                    {formData.register_office_address
                      ? formData.register_office_address
                      : "-"}
                  </p>
                )}
              </ProfileField>
            </div>
            {/* Card 2 */}
            <div className="col-md-12">
              <ProfileField
                title={"Corporate Office"}
                editMode={editMode.corporate_office}
                handleEditClick={() => handleEditClick("corporate_office")}
                handleCancelClick={() => handleCancelClick("corporate_office")}
              >
                {editMode.corporate_office ? (
                  <div className="form-group row">
                    <div className="col mb-10">
                      <label
                        htmlFor="corporate_office_address"
                        className="font-weight-bold"
                      >
                        Corporate Office Address:
                      </label>
                      <textarea
                        type="text"
                        className="form-control no-focus-box-shadow"
                        placeholder="Enter Full Address"
                        name="corporate_office_address"
                        value={formData.corporate_office_address}
                        onChange={handleInputChange}
                        style={{ height: "150px" }}
                      />
                      {formErrors.corporate_office_address && (
                        <small className="text-danger">
                          {formErrors.corporate_office_address}
                        </small>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>
                    {formData.corporate_office_address
                      ? formData.corporate_office_address
                      : "-"}
                  </p>
                )}
              </ProfileField>
            </div>
            {/* Card 3 */}
            <div className="col-md-12">
              <ProfileField
                title={"Custom Address"}
                editMode={editMode.custom_address_title}
                handleEditClick={() => handleEditClick("custom_address_title")}
                handleCancelClick={() =>
                  handleCancelClick("custom_address_title")
                }
              >
                {editMode.custom_address_title ? (
                  <div className="form-group row">
                    <div className="col mb-10">
                      <label
                        htmlFor="custom_office_address"
                        className="font-weight-bold"
                      >
                        Custom Office Address:
                      </label>
                      <textarea
                        type="text"
                        className="form-control no-focus-box-shadow"
                        placeholder="Enter Full Address"
                        name="custom_office_address"
                        value={formData.custom_office_address}
                        onChange={handleInputChange}
                        style={{ height: "150px" }}
                      />
                      {formErrors.custom_office_address && (
                        <small className="text-danger">
                          {formErrors.custom_office_address}
                        </small>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>
                    {formData.register_office_address
                      ? formData.register_office_address
                      : "-"}
                  </p>
                )}
              </ProfileField>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
