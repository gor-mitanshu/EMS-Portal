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
          <Route
            path="/login"
            element={
              <RequireLogout>
                <Login />
              </RequireLogout>
            }
          />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify/:verificationToken"
            element={<UserVerification />}
          />
          {/* Layout Routes */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            {/* Company Routes */}
            <Route
              path="/company-profile"
              element={
                <RequireAuth>
                  <CompanyProfile />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route
                path="overview"
                element={
                  <RequireAuth>
                    <Overview />
                  </RequireAuth>
                }
              />
              <Route
                path="address"
                element={
                  <RequireAuth>
                    <Address />
                  </RequireAuth>
                }
              />
              <Route
                path="department"
                element={
                  <RequireAuth>
                    <Department />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="designation"
                element={
                  <RequireAuth>
                    <Designation />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="announcements"
                element={
                  <RequireAuth>
                    <Announcement />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="policies"
                element={
                  <RequireAuth>
                    <CompanyPolices />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="admin"
                element={
                  <RequireAuth>
                    <Admin />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="statutory"
                element={
                  <RequireAuth>
                    <Statutory />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="my-plan"
                element={
                  <RequireAuth>
                    <Plan />{" "}
                  </RequireAuth>
                }
              />
            </Route>

            {/* My Profile Routes */}
            <Route
              path="/my-profile"
              element={
                <RequireAuth>
                  <TabsComponent />{" "}
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="personal" replace />} />
              <Route
                path="personal"
                element={
                  <RequireAuth>
                    <Profile />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="work"
                element={
                  <RequireAuth>
                    <Work />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="team"
                element={
                  <RequireAuth>
                    <Team />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="education"
                element={
                  <RequireAuth>
                    <Education />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="family"
                element={
                  <RequireAuth>
                    <Family />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="documents"
                element={
                  <RequireAuth>
                    <DocumentTab />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="work-week"
                element={
                  <RequireAuth>
                    <WorkWeek />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="file-manager"
                element={
                  <RequireAuth>
                    <FileManager />{" "}
                  </RequireAuth>
                }
              />
            </Route>

            <Route
              path="directory"
              element={
                <RequireAuth>
                  <Directory />{" "}
                </RequireAuth>
              }
            />

            <Route
              path="attendance"
              element={
                <RequireAuth>
                  <Attendance />{" "}
                </RequireAuth>
              }
            />

            {/* <Route path="leave" element={<Leave />} /> */}
            {/* Leave Routes */}
            <Route
              path="/leave"
              element={
                <RequireAuth>
                  <Leave />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="logs" replace />} />
              <Route
                path="logs"
                element={
                  <RequireAuth>
                    <Logs />{" "}
                  </RequireAuth>
                }
              />
              {/* Leave's Rules route */}
              <Route
                path="rules"
                element={
                  <RequireAuth>
                    <Rules />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="balance"
                element={
                  <RequireAuth>
                    <Balance />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="settings"
                element={
                  <RequireAuth>
                    <Settings />{" "}
                  </RequireAuth>
                }
              />
            </Route>

            <Route
              path="payroll"
              element={
                <RequireAuth>
                  <Payroll />{" "}
                </RequireAuth>
              }
            />

            <Route
              path="organizing-chart"
              element={
                <RequireAuth>
                  <Chart />{" "}
                </RequireAuth>
              }
            />

            <Route
              path="holiday-calender"
              element={
                <RequireAuth>
                  <Calender />{" "}
                </RequireAuth>
              }
            />

            <Route
              path="rewards"
              element={
                <RequireAuth>
                  <Rewards />{" "}
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    <ToastContainer
      theme="colored"
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  </>
);
