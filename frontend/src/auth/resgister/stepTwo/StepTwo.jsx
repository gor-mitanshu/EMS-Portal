import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StepTwo = ({ formDataStep2, handleChangeStep2, handleBackStep }) => {
  const { companyName, companySize, employeeStrength } = formDataStep2;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    user_id: "",
    companyName: "",
    companySize: "",
    employeeStrength: "",
  });

  const requiredErrors = {
    companyName: "Company Name is required",
    companySize: "Company Size is required",
    employeeStrength: "Employee Strength is required",
  };

  const validateStep2 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formIsValid = true;
    const newErrors = { ...errors };

    // Reset errors
    Object.keys(newErrors).forEach((key) => {
      newErrors[key] = "";
    });

    const validateField = (fieldName, errorMessage) => {
      if (!formDataStep2[fieldName]) {
        newErrors[fieldName] = requiredErrors[fieldName];
        formIsValid = false;
      } else {
        newErrors[fieldName] = "";
      }
    };

    validateField("companyName", requiredErrors.companyName);
    validateField("companySize", requiredErrors.companySize);
    validateField("employeeStrength", requiredErrors.employeeStrength);

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const user_id = localStorage.getItem("user_id");
        const body = { companyName, companySize, employeeStrength, user_id };
        const res = await axios.post(
          `${process.env.REACT_APP_API}/company/signup`,
          body
        );
        if (res && res.data.success === true) {
          navigate("/login");
          toast.success(res.data.message);
          localStorage.clear();
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error.response.data.errors);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const { errors } = error.response.data;
          setErrors(errors);
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    }
    setIsSubmitting(false);
  };

  const handleFieldFocus = (fieldName) => {
    const newErrors = { ...errors, [fieldName]: "" };
    setErrors(newErrors);
  };

  return (
    <>
      <form onSubmit={validateStep2}>
        <div>
          <div className={`form-input-wrapper ${errors.companyName ? 'error-form-input' : ''}`}>
            <i className="bi bi-building-fill prefix-icon"></i>
            <input
              type="text"
              className="form-input"
              name="companyName"
              value={companyName}
              onChange={handleChangeStep2}
              onFocus={() => handleFieldFocus("companyName")}
              placeholder="Enter Your Company Name"
            />
          </div>
          <div className="input-error">{errors.companyName}</div>
        </div>

        <div>
          <div className={`form-input-wrapper ${errors.employeeStrength ? 'error-form-input' : ''}`}>
            <i className="bi bi-people-fill prefix-icon"></i>
            <input
              type="number"
              className="form-input"
              name="employeeStrength"
              value={employeeStrength}
              onChange={handleChangeStep2}
              onFocus={() => handleFieldFocus("employeeStrength")}
              placeholder="Enter Your Employee Strength"
            />
          </div>
          <div className="input-error">{errors.employeeStrength}</div>
        </div>

        <div className="mt-3">
          <button
            type="button"
            className="btn btn-light px-4"
            onClick={handleBackStep}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary px-4 ms-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign up"}
          </button>
        </div>
      </form>
    </>
  );
};

export default StepTwo;
