import React, { useState } from "react";

const StepOne = ({
  formDataStep1,
  handleChangeStep1,
  // handleEmailVerify,
  // emailVerified,
  isStep1Valid,
  handleNextStep,
}) => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const { firstName, lastName, email, phone } = formDataStep1;

  const validateStep1 = () => {
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

    // if (!emailVerified) {
    //   newErrors.email = "Please Verify Your Email";
    //   formIsValid = false;
    // }

    if (formIsValid) {
      handleNextStep();
    }

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
              className="form-control"
              id="exampleInputFirstName"
              name="firstName"
              value={firstName}
              onChange={handleChangeStep1}
              placeholder="Enter Your First Name"
            />
            <div className="text-danger">{errors.firstName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLastName"
              name="lastName"
              value={lastName}
              onChange={handleChangeStep1}
              placeholder="Enter Your Last Name"
            />
            <div className="text-danger">{errors.lastName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={handleChangeStep1}
                placeholder="Enter Your Email"
              />
              {/* {!emailVerified && email && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleEmailVerify}
                >
                  Verify
                </button>
              )} */}
            </div>
            {/* {!emailVerified && email && (
              <p style={{ fontSize: "12px", color: "grey" }}>
                Verify your email to proceed
              </p>
            )} */}
            <div className="text-danger">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="exampleInputPhone"
                name="phone"
                value={phone}
                onChange={handleChangeStep1}
                placeholder="Enter Your Phone Number"
              />
            </div>
            <div className="text-danger">{errors.phone}</div>
          </div>
          <div className="mb-3 text-center">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isStep1Valid}
              onClick={validateStep1}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StepOne;
