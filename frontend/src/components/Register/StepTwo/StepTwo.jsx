import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StepTwo = ({
  formDataStep2,
  handleChangeStep2,
  handleBackStep,
  errors,
  setErrors,
}) => {
  const { companyName, companySize, employeeStrength } = formDataStep2;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep2 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formIsValid = true;
    const newErrors = { ...errors };

    if (!companyName) {
      newErrors.companyName = "Please Enter Your Company Name";
      formIsValid = false;
    } else {
      newErrors.companyName = "";
    }

    if (!companySize) {
      newErrors.companySize = "Please Enter Your Company Size";
      formIsValid = false;
    } else {
      newErrors.companySize = "";
    }

    if (!employeeStrength) {
      newErrors.employeeStrength = "Please Enter Your Company Strength";
      formIsValid = false;
    } else {
      newErrors.employeeStrength = "";
    }

    if (formIsValid) {
      try {
        const user_id = localStorage.getItem("user_id");
        const body = { companyName, companySize, employeeStrength, user_id };
        const res = await axios.post(
          `${process.env.REACT_APP_API}/company/signup`,
          body
        );
        if (res && res.data.success === true) {
          console.log(res);
          navigate("/login");
          toast.success(res.data.message);
        }
      } catch (error) {}
    }

    setErrors(newErrors);
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
              value={formDataStep2.companyName}
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
              value={formDataStep2.companySize}
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
              value={formDataStep2.employeeStrength}
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
