import React, { useState } from "react";
import axios from "axios";

const StepOne = ({
  formDataStep1,
  handleChangeStep1,
  handleNextStep,
  errors,
  setErrors,
}) => {
  const { firstName, lastName, email, phone, password } = formDataStep1;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = async () => {
    setIsSubmitting(true);

    let formIsValid = true;
    const newErrors = { ...errors };

    if (!firstName) {
      newErrors.firstName = "Please Enter Your First Name";
      formIsValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!lastName) {
      newErrors.lastName = "Please Enter Your Last Name";
      formIsValid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!email) {
      newErrors.email = "Please Enter Your Email";
      formIsValid = false;
    } else {
      newErrors.email = "";
    }

    if (!phone) {
      newErrors.phone = "Please Enter Your Phone Number";
      formIsValid = false;
    } else {
      newErrors.phone = "";
    }

    if (!password) {
      newErrors.password = "Please Enter a Password";
      formIsValid = false;
    } else {
      newErrors.password = "";
    }

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
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              id="exampleInputFirstName"
              name="firstName"
              value={firstName}
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("firstName")}
              placeholder="Enter Your First Name"
            />
            <div className="invalid-feedback">{errors.firstName}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputLastName">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              id="exampleInputLastName"
              name="lastName"
              value={lastName}
              onChange={handleChangeStep1}
              onFocus={() => handleFieldFocus("lastName")}
              placeholder="Enter Your Last Name"
            />
            <div className="invalid-feedback">{errors.lastName}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email</label>
            <div className="input-group">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={handleChangeStep1}
                onFocus={() => handleFieldFocus("email")}
                placeholder="Enter Your Email"
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <input
                type="number"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                id="exampleInputPhone"
                name="phone"
                value={phone}
                onChange={handleChangeStep1}
                onFocus={() => handleFieldFocus("phone")}
                placeholder="Enter Your Phone Number"
              />
              <div className="invalid-feedback">{errors.phone}</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="exampleInputPassword"
                name="password"
                value={password}
                onChange={handleChangeStep1}
                onFocus={() => handleFieldFocus("password")}
                placeholder="Enter a Strong Password"
              />
              <div className="invalid-feedback">{errors.password}</div>
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
