import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormWrapper from "../../UI/formWrapper/FormWrapper";
import "../../UI/formWrapper/FormWrapper.css";
import "./Login.css";
import { loginValidations } from "../../utils/formValidations";

const initLoginForm = { email: "", password: "" };
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setData] = useState(initLoginForm);
  const [errors, setErrors] = useState({});
  const [verificationLinkStatus, setVerificationLinkStatus] = useState("");

  const handleChange = (e, fieldName) => {
    const { name, value } = e.target;

    setData({ ...loginData, [name]: value });
    const { errors: loginErrors } = loginValidations({
      [name]: value,
    });
    setErrors(loginErrors);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: loginErrors, isValid: loginValid } =
      loginValidations(loginData);
    if (!loginValid) {
      setErrors(loginErrors);
      return;
    }
    try {
      if (loginData.email === "" || loginData.password === "") {
        return;
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/signin`,
          loginData
        );
        if (res) {
          const data = res.data.token;
          localStorage.setItem("token", JSON.stringify(data));
          toast.success(res.data.message);
          navigate("/");
        }
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
  };

  // Function to handle resend verification link
  const handleResendVerification = async () => {
    try {
      const body = {
        email: loginData.email,
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
                  placeholder="Enter Your Email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => handleChange(e, "email")}
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
                  name="password"
                  value={loginData.password}
                  onChange={(e) => handleChange(e, "password")}
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
