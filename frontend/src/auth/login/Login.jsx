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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [verificationLinkStatus, setVerificationLinkStatus] = useState("");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e, fieldName) => {
    const { name, value } = e.target;

    setData({ ...loginData, [name]: value });
    const { errors: loginErrors } = loginValidations({
      [name]: value,
    });
    setError(loginErrors);
    // const filterErrors = Object.assign({}, error, loginErrors);
    // console.log(loginErrors);
    // console.log(error);
    // console.log(filterErrors);

    // setError(filetredErrors);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: loginErrors, isValid: loginValid } =
      loginValidations(loginData);
    if (!loginValid) {
      setError(loginErrors);
      return;
    }
    try {
      if (loginData.email === "" || loginData.password === "") {
        return;
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/user/loginUser`,
          loginData
        );
        if (res) {
          const data = res.data.token;
          localStorage.setItem("token", JSON.stringify(data));
          toast.success(res.data.message);
          navigate("/");
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      if (error.name === "AxiosError" && error.message === "Network Error") {
        toast.error("Connection to server lost");
      }
      if (
        error.response.data.errors &&
        error.response.data.errors.password &&
        error.response.data.errors.password === "Password does not match"
      ) {
        toast.error(error.response.data.errors.password);
      }
      console.log(error);
      if (error && error.response && error.response.data) {
        const { errors, status } = error.response.data;
        if (errors) {
          console.log("email verified error", errors);
          if (status === 300) {
            setVerificationLinkStatus("pending");
          }
          toast.error(errors);
        } else {
          const { message } = error.response.data;
          toast.error(message);
        }
      } else {
        console.log(error);
        setError({ general: "Something went wrong" });
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
        `${process.env.REACT_APP_API}/user/sendVerificationLink`,
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
        setError({ general: "Something went wrong" });
      }
    }
  };

  return (
    <FormWrapper title={ "Welcome back :)" }>
      <div>
        <div className="d-flex flex-column">
          <form onSubmit={ handleSubmit }>
            <div className="text-start">
              <div
                className={ `form-input-wrapper ${error.email ? "error-form-input" : ""
                  }` }
              >
                <i className="bi bi-person-fill prefix-icon"></i>
                <input
                  type="text"
                  className="form-input"
                  id="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={ loginData.email }
                  onChange={ (e) => handleChange(e, "email") }
                />
              </div>
              <div className="input-error">{ error.email }</div>
            </div>
            <div className="text-start">
              <div
                className={ `form-input-wrapper ${error.password ? "error-form-input" : ""
                  }` }
              >
                <i className="bi bi-lock-fill prefix-icon"></i>
                <input
                  type={ showPassword ? "text" : "password" }
                  className="form-input"
                  id="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={ loginData.password }
                  onChange={ (e) => handleChange(e, "password") }
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
              <div className="input-error">{ error.password }</div>
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
              <Link to={ "/register" } className="btn btn-light px-4 ms-3">
                Create Account
              </Link>
            </div>

            { verificationLinkStatus && verificationLinkStatus !== "sent" && (
              <div
                className="btn btn-secondary w-100 mt-3"
                onClick={ handleResendVerification }
                disabled={ verificationLinkStatus === "sending" }
              >
                { verificationLinkStatus === "sending"
                  ? "Sending..."
                  : "Click here to resend the Verification Link" }
              </div>
            ) }
          </form>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Login;
