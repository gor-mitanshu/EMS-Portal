import React, { useState } from "react";
import "./Register.css";
import KarmDigitech from "../../assets/karmdigitech.png";
import Step2Register from "./StepTwo/StepTwo";
import Step1Register from "./StepOne/StepOne";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formDataStep1, setFormDataStep1] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formDataStep2, setFormDataStep2] = useState({
    companyName: "",
    companySize: "",
    employeeStrength: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
    employeeStrength: "",
  });

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

  const isStep1Valid =
    formDataStep1.firstName !== "" &&
    formDataStep1.lastName !== "" &&
    formDataStep1.email !== "" &&
    formDataStep1.phone !== "" &&
    formDataStep1.password !== "";

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
              <h5 className="text-center">Create an Account</h5>
              <p className="text-center">Sign up to get started</p>
              {step === 1 && (
                <Step1Register
                  formDataStep1={formDataStep1}
                  handleChangeStep1={handleChangeStep1}
                  isStep1Valid={isStep1Valid}
                  handleNextStep={handleNextStep}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {step === 2 && (
                <Step2Register
                  formDataStep2={formDataStep2}
                  handleChangeStep2={handleChangeStep2}
                  handleBackStep={handleBackStep}
                  errors={errors}
                  setErrors={setErrors}
                />
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
