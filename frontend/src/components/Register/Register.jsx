import React, { useState } from "react";
import "./Register.css";
import KarmDigitech from "../../assets/karmdigitech.png";

const Register = () => {
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [formDataStep1, setFormDataStep1] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [formDataStep2, setFormDataStep2] = useState({
    companyName: "",
    companySize: "",
    employeeStrength: "",
  });

  const handleEmailVerify = () => {
    // Implement email verification logic here
    setEmailVerified(true);
  };

  const handlePhoneVerify = () => {
    // Implement phone number verification logic here
    setPhoneVerified(true);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleChangeStep1 = (e) => {
    const { name, value } = e.target;
    setFormDataStep1({ ...formDataStep1, [name]: value });
  };

  const handleChangeStep2 = (e) => {
    const { name, value } = e.target;
    setFormDataStep2({ ...formDataStep2, [name]: value });
  };

  return (
    <div className="container-fluid d-flex flex-wrap w-100 p-0 vh-100">
      {/* form */}
      <div className="register-form">
        <div className="register-box">
          <div className="form">
            <div style={{ textAlign: "center" }}>
              <img
                src={KarmDigitech}
                alt="Logo"
                width={200}
                height={30}
                className="mb-5"
                style={{ textAlign: "center" }}
              />
            </div>
            <div>
              <h5
                style={{
                  fontWeight: "500",
                  fontSize: "1.125rem",
                  color: "rgb(49 53 51 / 1 !important)",
                  fontFamily: "IBM Plex Sans,sans-serif",
                  lineHeight: "1.35rem",
                  margin: "0px",
                  textAlign: "center",
                }}
              >
                Create an Account
                <p
                  className="mt-2 mb-4"
                  style={{
                    color: "rgb(116 120 141 / 1)",
                    fontSize: "0.8em",
                  }}
                >
                  Sign up to get started
                </p>
              </h5>
              {step === 1 && (
                <>
                  <div className="d-flex flex-column">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputFirstName"
                          className="form-label"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputFirstName"
                          name="firstName"
                          value={formDataStep1.firstName}
                          onChange={handleChangeStep1}
                          placeholder="Enter Your First Name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputLastName"
                          className="form-label"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputLastName"
                          name="lastName"
                          value={formDataStep1.lastName}
                          onChange={handleChangeStep1}
                          placeholder="Enter Your Last Name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email
                        </label>
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={formDataStep1.email}
                            onChange={handleChangeStep1}
                            placeholder="Enter Your Email"
                          />
                          {!emailVerified && (
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={handleEmailVerify}
                            >
                              Verify
                            </button>
                          )}
                        </div>
                        <p
                          className="mt-2 mb-4"
                          style={{
                            color: "rgb(116 120 141 / 1)",
                            fontSize: "0.8em",
                          }}
                        >
                          Verify your email to proceed
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPhone"
                          className="form-label"
                        >
                          Phone Number
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPhone"
                            name="phone"
                            value={formDataStep1.phone}
                            onChange={handleChangeStep1}
                            placeholder="Enter Your Phone Number"
                          />
                          {!phoneVerified && (
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={handlePhoneVerify}
                            >
                              Verify
                            </button>
                          )}
                        </div>
                        <p
                          className="mt-2 mb-4"
                          style={{
                            color: "rgb(116 120 141 / 1)",
                            fontSize: "0.8em",
                          }}
                        >
                          Verify your phone to proceed
                        </p>
                      </div>
                      <div className="mb-3 text-center">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNextStep}
                          disabled={!emailVerified || !phoneVerified}
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h5
                    style={{
                      fontWeight: "500",
                      fontSize: "1.125rem",
                      color: "rgb(49 53 51 / 1 !important)",
                      fontFamily: "IBM Plex Sans,sans-serif",
                      lineHeight: "1.35rem",
                      // margin: "0px",
                      marginTop: "20px",
                      textAlign: "center",
                    }}
                  >
                    Enter Company Details
                    <p
                      className="mt-2 mb-4"
                      style={{
                        color: "rgb(116 120 141 / 1)",
                        fontSize: "0.8em",
                      }}
                    >
                      Provide your company details to complete registration
                    </p>
                  </h5>
                  <div className="d-flex flex-column">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputCompanyName"
                          className="form-label"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputCompanyName"
                          name="companyName"
                          value={formDataStep2.companyName}
                          onChange={handleChangeStep2}
                          placeholder="Enter Your Company Name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputCompanySize"
                          className="form-label"
                        >
                          Company Size
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputCompanySize"
                          name="companySize"
                          value={formDataStep2.companySize}
                          onChange={handleChangeStep2}
                          placeholder="Enter Your Company Size"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmployeeStrength"
                          className="form-label"
                        >
                          Employee Strength
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmployeeStrength"
                          name="employeeStrength"
                          value={formDataStep2.employeeStrength}
                          onChange={handleChangeStep2}
                          placeholder="Enter Your Employee Strength"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleBackStep}
                        style={{ marginRight: "6px" }}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* bg */}
      <div className="register-bg-wrapper">
        <div className="register-bg"></div>
        <div className="background-color"></div>
      </div>
    </div>
  );
};

export default Register;
