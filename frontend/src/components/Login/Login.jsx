import React, { useState } from "react";
import "./Login.css";
import KarmDigitech from "../../assets/karmdigitech.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

    if (!email) {
      newErrors.email = "Please enter your email";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Please enter your password";
      formIsValid = false;
    }

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
          `${process.env.REACT_APP_API}/company/signin`,
          body
        );
        if (res) {
          console.log(res);
          const data = res.data.token;
          localStorage.setItem("token", JSON.stringify(data));
          navigate("/dashboard");
          toast.success(res.message);
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
        `${process.env.REACT_APP_API}/company/resendVerificationLink`,
        body
      );
      if (res) {
        console.log(res);
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
    <div className="container-fluid d-flex flex-wrap w-100 p-0 vh-100">
      <div className="login-form">
        <div className="login-box">
          <div className="form">
            <div style={{ textAlign: "center" }}>
              <img
                src={KarmDigitech}
                alt="Logo"
                width={200}
                height={30}
                className="mb-5"
                style={{ textAlign: "center" }}
              />
            </div>
            <div>
              <h5
                style={{
                  fontWeight: "500",
                  fontSize: "1.125rem",
                  color: "rgb(49 53 51 / 1 !important)",
                  fontFamily: "IBM Plex Sans,sans-serif",
                  lineHeight: "1.35rem",
                  margin: "0px",
                  textAlign: "center",
                }}
              >
                Welcome Back!
                <p
                  className="mt-2 mb-4"
                  style={{
                    color: "rgb(116 120 141 / 1)",
                    fontSize: "0.8em",
                  }}
                >
                  Sign in to continue to system
                </p>
              </h5>
              <div className="d-flex flex-column">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => handleFieldFocus("email")}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => handleFieldFocus("password")}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-75">
                      Submit
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <Link to="/login????" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="mt-3 text-center">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                  </div>

                  {verificationLinkStatus &&
                    verificationLinkStatus !== "sent" && (
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
          </div>
        </div>
      </div>

      <div className="login-bg-wrapper">
        <div className="login-bg"></div>
        <div className="background-color"></div>
      </div>
    </div>
  );
};

export default Login;
