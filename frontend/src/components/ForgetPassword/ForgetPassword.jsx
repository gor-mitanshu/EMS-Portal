import React, { useState } from "react";
import KarmDigitech from "../../assets/karmdigitech.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  // const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    otp: "",
  });
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email: user.email,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/company/forgetpassword`,
        body
      );
      if (res) {
        console.log(res);
        setShowOTPInput(true);
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data) {
        const { message } = error.response.data;
        console.log(error);
        toast.error(message);
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  const handleOTPSuccess = async (e) => {
    e.preventDefault();
    // let formIsValid = true;
    // const newErrors = {};

    // if (!user.otp) {
    //   newErrors.email = "Please Enter OTP to verify";
    //   formIsValid = false;
    //   return;
    // }

    const body = {
      email: user.email,
      otp: user.otp,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/company/verifyOtp`,
        body
      );
      if (!!res) {
        console.log(res);
        const { token, id } = res.data.data;

        navigate(`/resetpassword/${id}/${token}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
            {showOTPInput ? (
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
                  OTP Verification
                  <p
                    className="mt-2 mb-4"
                    style={{
                      color: "rgb(116 120 141 / 1)",
                      fontSize: "0.8em",
                    }}
                  >
                    Please enter the OTP sent to your email
                  </p>
                </h5>
                <div className="d-flex flex-column">
                  <form onSubmit={handleOTPSuccess}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputOTP" className="form-label">
                        OTP
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputOTP"
                        placeholder="Enter OTP"
                        value={user.otp}
                        onChange={handleChange}
                        name="otp"
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary w-75">
                        Verify OTP
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
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
                  Forgot Password?
                  <p
                    className="mt-2 mb-4"
                    style={{
                      color: "rgb(116 120 141 / 1)",
                      fontSize: "0.8em",
                    }}
                  >
                    Enter your email address below to receive a password reset
                    link
                  </p>
                </h5>
                <div className="d-flex flex-column">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Your Email"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary w-75">
                        Submit
                      </button>
                    </div>

                    <div className="mt-3 text-center">
                      <Link to="/login" className="text-decoration-none">
                        Back to Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            )}
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

export default ForgotPassword;
