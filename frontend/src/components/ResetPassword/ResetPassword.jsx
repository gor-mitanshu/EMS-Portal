import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormWrapper from "../../UI/FormWrapper/FormWrapper";
import "../../UI/FormWrapper/FormWrapper.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("Please Enter a Password");
      return;
    }
    if (!confirmPassword) {
      setError("Please Enter a Confirm Password");
      return;
    }
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
        `${process.env.REACT_APP_API}/resetPassword/${id}/${token}`,
        body
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      <FormWrapper title={"Reset Password"}>
        <div className="d-flex flex-column">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div>
              <div className={`form-input-wrapper ${error ? 'error-form-input' : ''}`}>
                <i className="bi bi-lock-fill prefix-icon"></i>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-error">{error}</div>
            </div>
            <div>
              <div className={`form-input-wrapper ${error ? 'error-form-input' : ''}`}>
                <i className="bi bi-lock-fill prefix-icon"></i>
                <input
                  type="password"
                  className="form-input"
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="input-error">{error}</div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </FormWrapper>
    </>
  );
};

export default ResetPassword;
