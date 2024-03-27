import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
// import Dashboard from "./components/Dashboard/Dashboard";
import UserVerification from "./components/Verification/Verification";
import ForgotPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Layout from "./components/Layout/Layout";
// import ProfilePage from "./components/Profile/Profile";
import TabsComponent from "./components/ProfileTab/TabsComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify/:verificationToken"
            element={<UserVerification />}
          />

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="tab" replace />} />
            {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
            {/* <Route path={"/dashboard"} element={<Dashboard />} /> */}
            <Route path={"/tab"} element={<TabsComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// xs: 0;
// sm: 576;
// md: 768;
// lg: 992;
// xl: 1280;
// xxl: 1400;
