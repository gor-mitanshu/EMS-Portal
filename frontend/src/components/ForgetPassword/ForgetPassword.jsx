import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormWrapper from "../../UI/FormWrapper/FormWrapper";
import "../../UI/FormWrapper/FormWrapper.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    otp: "",
  });
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [emailStatus, setEmailStatus] = useState("idle"); // "idle", "sending", "sent", "failed"
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email) {
      setErrorMessage("Please Enter your Email");
      return;
    }
    try {
      setEmailStatus("sending");
      const body = {
        email: user.email,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/forgetpassword`,
        body
      );
      if (res.status === 200) {
        setEmailStatus("sent");
        setShowOTPInput(true);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setEmailStatus("failed");
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setErrorMessage(message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  const handleOTPSuccess = async (e) => {
    e.preventDefault();
    if (!user.otp) {
      setErrorMessage("Please Enter OTP to verify");
      return;
    }
    setVerifyingOTP(true);
    const body = {
      email: user.email,
      otp: user.otp,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/verifyOtp`,
        body
      );
      if (res.status === 200) {
        const { token, id } = res.data.data;
        navigate(`/resetpassword/${id}/${token}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setErrorMessage(message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setVerifyingOTP(false);
    }
  };

  return (
    <>
      <FormWrapper
        title={showOTPInput ? "OTP Verification" : "Forgot Password"}
        subtitle={
          showOTPInput
            ? "Please enter the OTP sent to your email"
            : "Enter your email address below to reset your password"
        }
      >
        {showOTPInput ? (
          <div className="d-flex flex-column">
            {/* {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )} */}
            <form onSubmit={handleOTPSuccess}>
              <div>
                <div className={`form-input-wrapper ${errorMessage ? 'error-form-input' : ''}`}>
                  <i className="bi bi-lock-fill prefix-icon"></i>
                  <input
                    type="text"
                    className="form-input"
                    id="exampleInputOTP"
                    placeholder="Enter OTP"
                    value={user.otp}
                    onChange={handleChange}
                    name="otp"
                  />
                </div>
                <div className="input-error">{errorMessage}</div>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={verifyingOTP}
                >
                  {verifyingOTP ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="d-flex flex-column">
            {/* {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )} */}
            <form onSubmit={handleSubmit}>
              <div>
                <div className={`form-input-wrapper ${errorMessage ? 'error-form-input' : ''}`}>
                  <i className="bi bi-person-fill prefix-icon"></i>
                  <input
                    type="email"
                    className="form-input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Email"
                    value={user.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="input-error">{errorMessage}</div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={emailStatus !== "idle"}
                >
                  {emailStatus === "sending"
                    ? "Sending..."
                    : emailStatus === "sent"
                      ? "Email Sent"
                      : "Get OTP"}
                </button>
                <Link to="/login" className="btn btn-light text-decoration-none ms-3 px-3">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        )}
      </FormWrapper>
    </>
  );
};

export default ForgotPassword;
