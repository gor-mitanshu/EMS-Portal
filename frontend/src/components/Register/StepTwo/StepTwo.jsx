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
      <div className="d-flex flex-column">
        <form onSubmit={validateStep2}>
          <div className="mb-3">
            <label htmlFor="exampleInputCompanyName">Company Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.companyName ? "is-invalid" : ""
              }`}
              id="exampleInputCompanyName"
              name="companyName"
              value={companyName}
              onChange={handleChangeStep2}
              onFocus={() => handleFieldFocus("companyName")}
              placeholder="Enter Your Company Name"
            />
            <div className="invalid-feedback">{errors.companyName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCompanySize">Company Size</label>
            <input
              type="text"
              className={`form-control ${
                errors.companySize ? "is-invalid" : ""
              }`}
              id="exampleInputCompanySize"
              name="companySize"
              value={companySize}
              onChange={handleChangeStep2}
              onFocus={() => handleFieldFocus("companySize")}
              placeholder="Enter Your Company Size"
            />
            <div className="invalid-feedback">{errors.companySize}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmployeeStrength">
              Employee Strength
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.employeeStrength ? "is-invalid" : ""
              }`}
              id="exampleInputEmployeeStrength"
              name="employeeStrength"
              value={employeeStrength}
              onChange={handleChangeStep2}
              onFocus={() => handleFieldFocus("employeeStrength")}
              placeholder="Enter Your Employee Strength"
            />
            <div className="invalid-feedback">{errors.employeeStrength}</div>
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBackStep}
              style={{ marginRight: "6px" }}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StepTwo;
