import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormWrapper from "../../UI/formWrapper/FormWrapper";
import "../../UI/formWrapper/FormWrapper.css";
import "./Login.css";
import { loginValidations } from "../../utils/validations";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [verificationLinkStatus, setVerificationLinkStatus] = useState("");

  // Function to validate the form fields

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    Object.keys(loginValidations).forEach((field) => {
      const rules = loginValidations[field];
      if (rules.required && !email) {
        newErrors[field] = rules.required;
        formIsValid = false;
      } else if (rules.pattern && !rules.pattern.value.test(email)) {
        newErrors[field] = rules.pattern.message;
        formIsValid = false;
      } else if (rules.minLength && password.length < rules.minLength.value) {
        newErrors[field] = rules.minLength.message;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    return formIsValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const body = {
          email,
          password,
        };
        const res = await axios.post(
          `${process.env.REACT_APP_API}/signin`,
          body
        );
        if (res) {
          const data = res.data.token;
          localStorage.setItem("token", JSON.stringify(data));
          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        if (error && error.response && error.response.data) {
          const { errors, status } = error.response.data;
          if (errors) {
            console.log("email verified error", errors);
            if (status === 300) {
              setVerificationLinkStatus("pending");
            }
            toast.error(errors);
            setErrors(errors);
          } else {
            const { message } = error.response.data;
            console.log(error);
            toast.error(message);
          }
        } else {
          console.log(error);
          setErrors({ general: "Something went wrong" });
        }
      }
    }
  };

  // Function to handle resend verification link
  const handleResendVerification = async () => {
    try {
      const body = {
        email,
      };
      setVerificationLinkStatus("sending");
      const res = await axios.post(
        `${process.env.REACT_APP_API}/resendVerificationLink`,
        body
      );
      if (res) {
        toast.warn(res.data.message);
        setVerificationLinkStatus("sent");
      }
    } catch (error) {
      console.log(error);
      setVerificationLinkStatus("");
      if (error && error.response && error.response.data) {
        const { message } = error.response.data;
        console.log(error);
        toast.error(message);
      } else {
        console.log(error);
        setErrors({ general: "Something went wrong" });
      }
    }
  };

  // Function to handle focus on form fields and clear related errors
  const handleFieldFocus = (fieldName) => {
    const newErrors = { ...errors, [fieldName]: "" };
    setErrors(newErrors);
  };

  return (
    <FormWrapper title={"Welcome back :)"}>
      <div>
        <div className="d-flex flex-column">
          <form onSubmit={handleSubmit}>
            <div className="text-start">
              <div
                className={`form-input-wrapper ${
                  errors.email ? "error-form-input" : ""
                }`}
              >
                <i className="bi bi-person-fill prefix-icon"></i>
                <input
                  type="text"
                  className="form-input"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFieldFocus("email")}
                />
              </div>
              <div className="input-error">{errors.email}</div>
            </div>
            <div className="text-start">
              <div
                className={`form-input-wrapper ${
                  errors.password ? "error-form-input" : ""
                }`}
              >
                <i className="bi bi-lock-fill prefix-icon"></i>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFieldFocus("password")}
                />
              </div>
              <div className="input-error">{errors.password}</div>
            </div>

            <div>
              <Link to="/forgetpassword" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Sign in
              </button>
              <Link to={"/register"} className="btn btn-light px-4 ms-3">
                Create Account
              </Link>
            </div>

            {verificationLinkStatus && verificationLinkStatus !== "sent" && (
              <div
                className="btn btn-secondary w-100 mt-3"
                onClick={handleResendVerification}
                disabled={verificationLinkStatus === "sending"}
              >
                {verificationLinkStatus === "sending"
                  ? "Sending..."
                  : "Click here to resend the Verification Link"}
              </div>
            )}
          </form>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Login;
