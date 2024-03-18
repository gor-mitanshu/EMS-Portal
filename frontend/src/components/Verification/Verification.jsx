import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserVerification = () => {
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    if (verificationToken) {
      const verifyUser = async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/company/verify/${verificationToken}`
          );

          if (res.status === 200) {
            console.log(res);
            setVerificationStatus(
              "Email verification successful. Redirecting to Login..."
            );
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 2000);
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
    <div>
      <h2>{verificationStatus}</h2>
    </div>
  );
};

export default UserVerification;
