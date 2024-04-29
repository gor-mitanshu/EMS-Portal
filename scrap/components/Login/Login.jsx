import React from "react";
import "./Login.css";
import KarmDigitech from "../../assets/images/karmdigitech.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container-fluid d-flex flex-wrap w-100 p-0 vh-100">
      {/* form */}
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
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Your Email"
                    />
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
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                    />
                  </div>

                  {/* <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Remember Me
                    </label>
                  </div> */}
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <div className="mt-4">
                    <Link to="/" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="mt-3">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bg */}
      <div className="login-bg-wrapper">
        <div className="login-bg"></div>
        <div className="background-color"></div>
      </div>
    </div>
  );
};

export default Login;
