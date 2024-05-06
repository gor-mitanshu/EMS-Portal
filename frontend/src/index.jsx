import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import ForgotPassword from "./auth/forgetPassword/ForgetPassword";
import ResetPassword from "./auth/resetPassword/ResetPassword";
import Register from "./auth/resgister/Register";
import UserVerification from "./auth/verification/Verification";
import App from "./layout/App";
import Dashboard from "./pages/dashboard/Dashboard";
import Attendance from "./pages/attendance/Attendance";
import Leave from "./pages/leave/Leave";
import Payroll from "./pages/payroll/Payroll";
import CompanyProfile from "./pages/companyProfile/CompanyProfile";
import Overview from "./pages/companyProfile/overview/Overview";
import Address from "./pages/companyProfile/address/Address";
import Department from "./pages/companyProfile/department/Department";
import Profile from "./pages/profile/profile/MyProfile";
import Announcement from "./pages/companyProfile/announcements/Announcement";
import CompanyPolices from "./pages/companyProfile/poilcy/CompanyPolicies";
import TabsComponent from "./pages/profile/TabsComponent";
import Work from "./pages/profile/work/Work";
import Team from "./pages/profile/team/Team";
import Education from "./pages/profile/education/Education";
import Family from "./pages/profile/family/Family";
import DocumentTab from "./pages/profile/documents/DocumentTab";
import WorkWeek from "./pages/profile/workWeek/WorkWeek";
import FileManager from "./pages/profile/fileManager/FileManager";
import Logs from "./pages/leave/logs/Logs";
import Rules from "./pages/leave/rules/Rules";
import Balance from "./pages/leave/balance/Balance";
import Settings from "./pages/leave/settings/Settings";
import Directory from "./pages/directory/Directory";
import Chart from "./pages/organizingChart/Chart";
import Calender from "./pages/holidayCalender/Calender";
import Rewards from "./pages/rewards/Rewards";
import Designation from "./pages/companyProfile/designation/Designation";
import Admin from "./pages/companyProfile/admins/Admin";
import Statutory from "./pages/companyProfile/statutory/Statutory";
import Plan from "./pages/companyProfile/plan/Plan";
import { RequireAuth, RequireLogout } from "./authGuard/AuthGuard";
import { AuthProvider } from "./authGuard/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<RequireLogout><Login /></RequireLogout>} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:verificationToken" element={<UserVerification />} />
          {/* Layout Routes */}
          <Route path="/" element={<RequireAuth><App /></RequireAuth>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Company Routes */}
            <Route path="/company-profile" element={<CompanyProfile />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="address" element={<Address />} />
              <Route path="department" element={<Department />} />
              <Route path="designation" element={<Designation />} />
              <Route path="announcements" element={<Announcement />} />
              <Route path="policies" element={<CompanyPolices />} />
              <Route path="admin" element={<Admin />} />
              <Route path="statutory" element={<Statutory />} />
              <Route path="my-plan" element={<Plan />} />
            </Route>

            {/* My Profile Routes */}
            <Route path="/my-profile" element={<TabsComponent />}>
              <Route index element={<Navigate to="personal" replace />} />
              <Route path="personal" element={<Profile />} />
              <Route path="work" element={<Work />} />
              <Route path="team" element={<Team />} />
              <Route path="education" element={<Education />} />
              <Route path="family" element={<Family />} />
              <Route path="documents" element={<DocumentTab />} />
              <Route path="work-week" element={<WorkWeek />} />
              <Route path="file-manager" element={<FileManager />} />
            </Route>

            {/* Leave Routes */}
            <Route path="/leave" element={<Leave />}>
              <Route index element={<Navigate to="logs" replace />} />
              <Route path="logs" element={<Logs />} />
              <Route path="rules" element={<Rules />} />
              <Route path="balance" element={<Balance />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="directory" element={<Directory />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="organizing-chart" element={<Chart />} />
            <Route path="holiday-calender" element={<Calender />} />
            <Route path="rewards" element={<Rewards />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <ToastContainer theme="colored" position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover />
  </>
);