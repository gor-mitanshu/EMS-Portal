import React, { useState } from "react";
import {
  // Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [error, setError] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const body = {
        id,
        token,
        password,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/company/resetPassword/${id}/${token}`,
        body
      );
      if (res) {
        console.log(res);
        toast.success(res.data.message);
        navigate("/login");
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
  console.log(error);

  return (
    <div className="container-fluid d-flex flex-wrap w-100 p-0 vh-100">
      <div className="login-form">
        <div className="login-box">
          <div className="form">
            <div className="text-center mb-5">
              <h3>Reset Password</h3>
            </div>
            <div className="d-flex flex-column">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-75">
                    Reset Password
                  </button>
                </div>
              </form>
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

export default ResetPassword;
