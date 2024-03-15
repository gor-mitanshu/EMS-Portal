import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StepOne = ({ formDataStep1, handleChangeStep1, handleNextStep }) => {
  const { firstName, lastName, email, phone, password } = formDataStep1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const regex = {
    name: /^[a-zA-Z ]{2,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{10}$/,
    password: /^[\w@-]{5,10}$/,
  };

  const validateStep1 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formIsValid = true;
    const newErrors = { ...errors };

    // Reset errors
    Object.keys(newErrors).forEach((key) => {
      newErrors[key] = "";
    });

    // Validations
    if (!firstName) {
      newErrors.firstName = "Please Enter Your First Name";
      formIsValid = false;
    } else if (!regex.name.test(firstName)) {
      newErrors.firstName =
        "Please enter a valid First Name (2-30 characters, letters only)";
      formIsValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Please Enter Your Last Name";
      formIsValid = false;
    } else if (!regex.name.test(lastName)) {
      newErrors.lastName =
        "Please enter a valid Last Name (2-30 characters, letters only)";
      formIsValid = false;
    }

    if (!email) {
      newErrors.email = "Please Enter Your Email";
      formIsValid = false;
    } else if (!regex.email.test(email)) {
      newErrors.email = "Please Enter a Valid Email";
      formIsValid = false;
    }

    if (!phone) {
      newErrors.phone = "Please Enter Your Phone Number";
      formIsValid = false;
    } else if (!regex.phone.test(phone)) {
      newErrors.phone = "Phone Number should be exactly 10 digits long";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Please Enter a Password";
      formIsValid = false;
    } else if (!regex.password.test(password)) {
      newErrors.password =
        "Password should be 5 to 10 characters long and can contain letters, digits, and some special characters";
      formIsValid = false;
    }

    setErrors(newErrors);
    if (formIsValid) {
      try {
        const body = { firstName, lastName, email, phone, password };
        const res = await axios.post(
          `${process.env.REACT_APP_API}/company/signup`,
          body
        );
        console.log(res);
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
      <div className="d-flex flex-column">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName">First Name</label>
            <input
              type="text"
              className={
                errors.firstName
                  ? `form-control ${errors.firstName ? "is-invalid" : ""}`
                  : "form-control"
              }
              id="exampleInputFirstName"
              name="firstName"
              value={firstName}
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("firstName")}
              placeholder="Enter Your First Name"
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputLastName">Last Name</label>
            <input
              type="text"
              className={
                errors.lastName
                  ? `form-control ${errors.lastName ? "is-invalid" : ""}`
                  : "form-control"
              }
              id="exampleInputLastName"
              name="lastName"
              value={lastName}
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("lastName")}
              placeholder="Enter Your Last Name"
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email</label>
            <div className="input-group">
              <input
                type="email"
                className={
                  errors.email
                    ? `form-control ${errors.email ? "is-invalid" : ""}`
                    : "form-control"
                }
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={handleChangeStep1}
                onFocus={() => handleFieldFocus("email")}
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <input
                type="number"
                className={
                  errors.phone
                    ? `form-control ${errors.phone ? "is-invalid" : ""}`
                    : "form-control"
                }
                id="exampleInputPhone"
                name="phone"
                value={phone}
                onChange={handleChangeStep1}
                onFocus={() => handleFieldFocus("phone")}
                placeholder="Enter Your Phone Number"
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type="text"
                className={
                  errors.password
                    ? `form-control ${errors.password ? "is-invalid" : ""}`
                    : "form-control"
                }
                id="exampleInputPassword"
                name="password"
                value={password}
                onChange={handleChangeStep1}
                onFocus={() => handleFieldFocus("password")}
                placeholder="Enter a Strong Password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          <div className="mb-3 text-center">
            <button
              type="button"
              className="btn btn-primary"
              disabled={isSubmitting}
              onClick={validateStep1}
            >
              {isSubmitting ? "Submitting..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StepOne;
