import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { registerStepOneValidations } from "../../../utils/formValidations";

const StepOne = ({
  formDataStep1,
  handleChangeStep1,
  handleNextStep,
  validations,
}) => {
  const { firstName, lastName, email, phone, password } = formDataStep1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(validations);

  const validateStep1 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = registerStepOneValidations(formDataStep1);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const body = { firstName, lastName, email, phone, password };
        const res = await axios.post(
          `${process.env.REACT_APP_API}/company/signup`,
          body
        );
        if (res && res.data.success === true) {
          localStorage.setItem("user_id", res.data.userData._id);
          handleNextStep();
          setTimeout(() => {
            toast.warn("Check your email for a verification link.");
          }, 1000);
        } else {
          console.log(res);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const backendErrors = error.response.data.errors;
          // Object.keys(backendErrors).forEach((key) => {
          //   newErrors[key] = backendErrors[key];
          // });
          setErrors(backendErrors);
        } else {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
          console.error("An error occurred:", error.message);
        }
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <form className="row">
        <div className="col-6">
          <div
            className={`form-input-wrapper ${
              errors.firstName ? "error-form-input" : ""
            }`}
          >
            <i className="bi bi-person-fill prefix-icon"></i>
            <input
              type="text"
              className="form-input"
              name="firstName"
              value={firstName}
              onChange={(e) => handleChangeStep1(e, "firstName")}
              // onFocus={() => handleFieldFocus("firstName")}
              placeholder="Enter Your First Name"
            />
          </div>
          <div className="input-error">{errors.firstName}</div>
        </div>

        <div className="col-6">
          <div
            className={`form-input-wrapper ${
              errors.lastName ? "error-form-input" : ""
            }`}
          >
            <i className="bi bi-person-fill prefix-icon"></i>
            <input
              type="text"
              className="form-input"
              name="lastName"
              value={lastName}
              onChange={(e) => handleChangeStep1(e, "lastName")}
              // onFocus={() => handleFieldFocus("lastName")}
              placeholder="Enter Your Last Name"
            />
          </div>
          <div className="input-error">{errors.lastName}</div>
        </div>

        <div>
          <div
            className={`form-input-wrapper ${
              errors.email ? "error-form-input" : ""
            }`}
          >
            <i className="bi bi-envelope-fill prefix-icon"></i>
            <input
              type="email"
              className="form-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={(e) => handleChangeStep1(e, "email")}
              // onFocus={() => handleFieldFocus("email")}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="input-error">{errors.email}</div>
        </div>

        <div>
          <div
            className={`form-input-wrapper ${
              errors.phone ? "error-form-input" : ""
            }`}
          >
            <i className="bi bi-telephone-fill prefix-icon"></i>
            <input
              type="number"
              className="form-input"
              id="exampleInputPhone"
              name="phone"
              value={phone}
              onChange={(e) => handleChangeStep1(e, "phone")}
              // onFocus={() => handleFieldFocus("phone")}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="input-error">{errors.phone}</div>
        </div>

        <div>
          <div
            className={`form-input-wrapper ${
              errors.password ? "error-form-input" : ""
            }`}
          >
            <i className="bi bi-lock-fill prefix-icon"></i>
            <input
              type="text"
              className="form-input"
              id="exampleInputPassword"
              name="password"
              value={password}
              onChange={(e) => handleChangeStep1(e, "password")}
              // onFocus={() => handleFieldFocus("password")}
              placeholder="Enter a Strong Password"
            />
          </div>
          <div className="input-error">{errors.password}</div>
        </div>

        <div>
          Already have an account?{" "}
          <Link to={"/login"} className="text-decoration-none">
            Sign in
          </Link>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary px-5"
            disabled={isSubmitting}
            onClick={validateStep1}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </>
  );
};

export default StepOne;
