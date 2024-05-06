import useAuth from "./useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { authed } = useAuth();
  const location = useLocation();
  const data = localStorage.getItem("token");
  var jwtPayload = 0;
  jwtPayload = data ? JSON.parse(window.atob(data.split(".")[1])) : 0;
  const isTokenInvalid = Date.now() >= jwtPayload.exp * 1000;

  return authed === true ? (
    children
  ) : data && !isTokenInvalid ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export const RequireLogout = ({ children }) => {
  const { authed } = useAuth();
  const location = useLocation();
  const data = localStorage.getItem("token");
  var jwtPayload = 0;
  jwtPayload = data ? JSON.parse(window.atob(data.split(".")[1])) : 0;
  const isTokenInvalid = Date.now() >= jwtPayload.exp * 1000;

  return authed === true ? (
    children
  ) : data && !isTokenInvalid ? (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  ) : (
    children
  );
};
