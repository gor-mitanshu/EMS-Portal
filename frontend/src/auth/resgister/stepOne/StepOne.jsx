import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { stepOneValidations } from "../../../../utils/validations";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};
const StepOne = ({ formDataStep1, handleChangeStep1, handleNextStep }) => {
  const { firstName, lastName, email, phone, password } = formDataStep1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(initialState);

  const requiredErrors = {
    firstName: "First name is required",
    lastName: "Last name is required",
    email: "Email is required",
    phone: "Phone number is required",
    password: "Password is required",
  };

  const regex = {
    name: /^[a-zA-Z ]{2,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{10}$/,
    password: /^[\w@-]{5,10}$/,
  };

  // const validateForm = () => {
  //   let formIsValid = true;
  //   const newErrors = {};

  //   Object.keys(stepOneValidations).forEach((field) => {
  //     const rules = stepOneValidations[field];
  //     if (rules.required && !firstName) {
  //       newErrors[field] = rules.required;
  //       formIsValid = false;
  //     } else if (rules.pattern && !rules.pattern.value.test(firstName)) {
  //       newErrors[field] = rules.pattern.message;
  //       formIsValid = false;
  //     } else if (rules.required && !lastName) {
  //       newErrors[field] = rules.required;
  //       formIsValid = false;
  //     } else if (rules.pattern && !rules.pattern.value.test(lastName)) {
  //       newErrors[field] = rules.pattern.message;
  //       formIsValid = false;
  //     } else if (rules.required && !email) {
  //       newErrors[field] = rules.required;
  //       formIsValid = false;
  //     } else if (rules.pattern && !rules.pattern.value.test(email)) {
  //       newErrors[field] = rules.pattern.message;
  //       formIsValid = false;
  //     } else if (rules.required && !phone) {
  //       newErrors[field] = rules.required;
  //       formIsValid = false;
  //     } else if (rules.pattern && !rules.pattern.value.test(phone)) {
  //       newErrors[field] = rules.pattern.message;
  //       formIsValid = false;
  //     } else if (rules.minLength && password.length < rules.minLength.value) {
  //       newErrors[field] = rules.minLength.message;
  //       formIsValid = false;
  //     }
  //   });

  //   setErrors(newErrors);
  //   return formIsValid;
  // };

  const validateStep1 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formIsValid = true;
    const newErrors = { ...errors };

    // Reset errors
    Object.keys(newErrors).forEach((key) => {
      newErrors[key] = "";
    });

    const validateField = (fieldName, regex, errorMessage) => {
      if (!formDataStep1[fieldName]) {
        newErrors[fieldName] = requiredErrors[fieldName];
        formIsValid = false;
      } else if (!regex.test(requiredErrors[fieldName])) {
        newErrors[fieldName] = errorMessage;
        formIsValid = false;
      }
    };

    validateField(
      "firstName",
      regex.name,
      "Please enter a valid First Name (2-30 characters, letters only)"
    );
    validateField(
      "lastName",
      regex.name,
      "Please enter a valid Last Name (2-30 characters, letters only)"
    );
    validateField("email", regex.email, "Please enter a valid Email");
    validateField(
      "phone",
      regex.phone,
      "Phone Number should be exactly 10 digits long"
    );
    validateField(
      "password",
      regex.password,
      "Password should be 5 to 10 characters long and can contain letters, digits, and some special characters"
    );

    setErrors(newErrors);

    if (formIsValid) {
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
          Object.keys(backendErrors).forEach((key) => {
            newErrors[key] = backendErrors[key];
          });
          setErrors(newErrors);
        } else {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
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
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("firstName")}
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
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("lastName")}
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
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("email")}
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
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("phone")}
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
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("password")}
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
