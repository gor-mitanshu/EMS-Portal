import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { registerStepOneValidations } from "../../../utils/formValidations";

const StepOne = ({
  formDataStep1,
  handleChangeStep1,
  handleNextStep,
  errors,
  setErrors,
}) => {
  const { firstName, lastName, email, phone, password } = formDataStep1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

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
          `${process.env.REACT_APP_API}/user/addUser`,
          body
        );
        if (res && res.data) {
          handleNextStep(res.data.user_id);
          setTimeout(() => {
            toast.warn("Check your email for a verification link.");
          }, 1000);
        } else {
        }
      } catch (error) {
        if (error.name === "AxiosError" && error.message === "Network Error") {
          toast.error("Connection to server lost");
        }
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
            className={ `form-input-wrapper ${errors.firstName ? "error-form-input" : ""
              }` }
          >
            <i className="bi bi-person-fill prefix-icon"></i>
            <input
              type="text"
              className="form-input"
              name="firstName"
              value={ firstName }
              onChange={ (e) => handleChangeStep1(e, "firstName") }
              // onFocus={() => handleFieldFocus("firstName")}
              placeholder="Enter Your First Name"
            />
          </div>
          <div className="input-error">{ errors.firstName }</div>
        </div>

        <div className="col-6">
          <div
            className={ `form-input-wrapper ${errors.lastName ? "error-form-input" : ""
              }` }
          >
            <i className="bi bi-person-fill prefix-icon"></i>
            <input
              type="text"
              className="form-input"
              name="lastName"
              value={ lastName }
              onChange={ (e) => handleChangeStep1(e, "lastName") }
              // onFocus={() => handleFieldFocus("lastName")}
              placeholder="Enter Your Last Name"
            />
          </div>
          <div className="input-error">{ errors.lastName }</div>
        </div>

        <div>
          <div
            className={ `form-input-wrapper ${errors.email ? "error-form-input" : ""
              }` }
          >
            <i className="bi bi-envelope-fill prefix-icon"></i>
            <input
              type="email"
              className="form-input"
              name="email"
              value={ email }
              onChange={ (e) => handleChangeStep1(e, "email") }
              // onFocus={() => handleFieldFocus("email")}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="input-error">{ errors.email }</div>
        </div>

        <div>
          <div
            className={ `form-input-wrapper ${errors.phone ? "error-form-input" : ""
              }` }
          >
            <i className="bi bi-telephone-fill prefix-icon"></i>
            <input
              type="number"
              className="form-input"
              name="phone"
              value={ phone }
              onChange={ (e) => handleChangeStep1(e, "phone") }
              // onFocus={() => handleFieldFocus("phone")}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="input-error">{ errors.phone }</div>
        </div>

        <div>
          <div
            className={ `form-input-wrapper ${errors.password ? "error-form-input" : ""
              }` }
          >
            <i className="bi bi-lock-fill prefix-icon"></i>
            <input
              type={ showPassword ? "text" : "password" }
              className="form-input"
              name="password"
              value={ password }
              onChange={ (e) => handleChangeStep1(e, "password") }
              // onFocus={() => handleFieldFocus("password")}
              placeholder="Enter a Strong Password"
            />
            { !showPassword ? (
              <i
                onClick={ handleClickShowPassword }
                className="bi bi-eye-fill postfix-icon"
              ></i>
            ) : (
              <i
                onClick={ handleClickShowPassword }
                className="bi bi-eye-slash-fill postfix-icon"
              ></i>
            ) }
          </div>
          <div className="input-error">{ errors.password }</div>
        </div>

        <div>
          Already have an account?{ " " }
          <Link to={ "/login" } className="text-decoration-none">
            Sign in
          </Link>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary px-5"
            disabled={ isSubmitting }
            onClick={ validateStep1 }
          >
            { isSubmitting ? "Submitting..." : "Next" }
          </button>
        </div>
      </form>
    </>
  );
};

export default StepOne;
