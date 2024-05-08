import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Verified from "../../assets/images/verified.jpg";

const UserVerification = () => {
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [redirectTimer, setRedirectTimer] = useState(5); // Set the initial timer value

  useEffect(() => {
    if (verificationToken) {
      const verifyUser = async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/user/emailVerification/${verificationToken}`
          );

          if (res.status === 200) {
            setVerificationStatus(
              "Email verification successful. Redirecting to Login..."
            );
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 5000); // Redirect after 5 seconds
            const timer = setInterval(() => {
              setRedirectTimer((prevTimer) => prevTimer - 1); // Decrease timer by 1 second
            }, 1000);

            // Clear the timer interval when component unmounts
            return () => clearInterval(timer);
          }
        } catch (error) {
          console.error(error);
          setVerificationStatus(error?.response.data.message);
        }
      };

      verifyUser();
    }
  }, [navigate, verificationToken]);

  return (
    <div className="container">
      <div className="row justify-content-evenly align-items-center vh-100">
        <img src={ Verified } alt="" style={ { height: "50%", width: "30%" } } />
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{ verificationStatus }</h2>
              <p>Redirecting in { redirectTimer } seconds...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerification;
