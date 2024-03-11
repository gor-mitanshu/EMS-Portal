import React, { useState } from "react";
import "./Register.css";
import KarmDigitech from "../../assets/karmdigitech.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

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

  return (
    <div className="container-fluid d-flex flex-wrap w-100 p-0">
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
                      {emailVerified && phoneVerified && (
                        <div className="mb-3 text-center">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNextStep}
                          >
                            Next
                          </button>
                        </div>
                      )}
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
                      margin: "0px",
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
                          placeholder="Enter Your Employee Strength"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Back
                      </button>
                      <Link to={"/nextstep"}>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </Link>
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
