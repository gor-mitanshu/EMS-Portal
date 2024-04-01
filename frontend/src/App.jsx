import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import UserVerification from "./components/Verification/Verification";
import ForgotPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Layout from "./components/Layout/Layout";
import TabsComponent from "./components/ProfileTab/TabsComponent";
import Work from "./components/ProfileTab/Work/Work";
import Education from "./components/ProfileTab/Education/Education";
import Family from "./components/ProfileTab/Family/Family";
import DocumentTab from "./components/ProfileTab/Documents/DocumentTab";
import FileManager from "./components/ProfileTab/FileManager/FileManager";
import Profile from "./components/ProfileTab/Profile/PersonalProfile";
import Team from "./components/ProfileTab/Team/Team";
import WorkWeek from "./components/WorkWeek/WorkWeek";
import Attendance from "./components/Attendance/Attendance";
import Leave from "./components/Leave/Leave";
import Payroll from "./components/Payroll/Payroll";

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
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path="/work-week" element={<WorkWeek />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/payroll" element={<Payroll />} />

            <Route path="/my-profile" element={<TabsComponent />}>
              <Route index element={<Navigate to="personal" replace />} />
              <Route path="personal" element={<Profile />} />
              <Route path="work" element={<Work />} />
              <Route path="team" element={<Team />} />
              <Route path="education" element={<Education />} />
              <Route path="family" element={<Family />} />
              <Route path="documents" element={<DocumentTab />} />
              <Route path="file-manager" element={<FileManager />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
