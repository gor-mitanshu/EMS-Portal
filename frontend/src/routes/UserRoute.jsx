import React, { useEffect, useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import App from "../layout/App";
import Dashboard from "../pages/dashboard/Dashboard";
import Attendance from "../pages/attendance/Attendance";
import Leave from "../pages/leave/Leave";
import Payroll from "../pages/payroll/Payroll";
import CompanyProfile from "../pages/companyProfile/CompanyProfile";
import Company from "../pages/companyProfile/company/Company";
import Department from "../pages/companyProfile/department/Department";
import Profile from "../pages/profile/profile/MyProfile";
import Announcement from "../pages/companyProfile/announcements/Announcement";
import CompanyPolices from "../pages/companyProfile/poilcy/CompanyPolicies";
import TabsComponent from "../pages/profile/TabsComponent";
import Work from "../pages/profile/work/Work";
import Team from "../pages/profile/team/Team";
import Education from "../pages/profile/education/Education";
import Family from "../pages/profile/family/Family";
import DocumentTab from "../pages/profile/documents/DocumentTab";
import WorkWeek from "../pages/profile/workWeek/WorkWeek";
import FileManager from "../pages/profile/fileManager/FileManager";
import Logs from "../pages/leave/logs/Logs";
import Rules from "../pages/leave/rules/Rules";
import Balance from "../pages/leave/balance/Balance";
import Settings from "../pages/leave/settings/Settings";
import Directory from "../pages/directory/Directory";
import Chart from "../pages/organizingChart/Chart";
import Calender from "../pages/holidayCalender/Calender";
import Rewards from "../pages/rewards/Rewards";
import Designation from "../pages/companyProfile/designation/Designation";
import Admin from "../pages/companyProfile/admins/Admin";
import Statutory from "../pages/companyProfile/statutory/Statutory";
import Plan from "../pages/companyProfile/plan/Plan";
import { RequireAuth } from "../authGuard/AuthGuard";

import axios from "axios";

const UserRoute = () => {

    const [userId, setUserId] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const getCompanyData = async (userData, tokan) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API}/company/getUserDetailsByUserId/${userData._id}`,
            {
                headers: { Authorization: `Bearer ${tokan}` },
            }
        );
        if (response) {
            const { company } = response.data;
            setCompanyId(company._id)
        }
    }

    useEffect(() => {
        const tokan = JSON.parse(localStorage.getItem("token"));
        setAccessToken(tokan)

        var jwtPayload = 0;
        jwtPayload = tokan ? JSON.parse(window.atob(tokan.split('.')[1])) : 0;
        const isTokenInvalid = Date.now() >= jwtPayload.exp * 1000;

        if (tokan && !isTokenInvalid) {
            var { user } = JSON.parse(atob(tokan.split(".")[1]));
            setUserId(user ? user._id : '')

            if (companyId) {
                return
            } else {
                getCompanyData(user, tokan)
            }
        }
    }, [companyId])

    return (

        <Route path="/" element={<RequireAuth><App /></RequireAuth>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Company Routes */}
            <Route path="/company-profile" element={<CompanyProfile />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<Company companyId={companyId} accessToken={accessToken} />} />
                <Route path="department" element={<Department companyId={companyId} accessToken={accessToken} />} />
                <Route path="designation" element={<Designation companyId={companyId} accessToken={accessToken} />} />
                <Route path="announcements" element={<Announcement companyId={companyId} accessToken={accessToken} />} />
                <Route path="policies" element={<CompanyPolices companyId={companyId} accessToken={accessToken} />} />
                <Route path="admin" element={<Admin companyId={companyId} accessToken={accessToken} />} />
                <Route path="statutory" element={<Statutory companyId={companyId} accessToken={accessToken} />} />
                <Route path="my-plan" element={<Plan companyId={companyId} accessToken={accessToken} />} />
            </Route>

            {/* My Profile Routes */}
            <Route path="/my-profile" element={<TabsComponent />}>
                <Route index element={<Navigate to="personal" replace />} />
                <Route path="personal" element={<Profile userId={userId} accessToken={accessToken} />} />
                <Route path="work" element={<Work userId={userId} accessToken={accessToken} />} />
                <Route path="team" element={<Team userId={userId} accessToken={accessToken} />} />
                <Route path="education" element={<Education userId={userId} accessToken={accessToken} />} />
                <Route path="family" element={<Family userId={userId} accessToken={accessToken} />} />
                <Route path="documents" element={<DocumentTab userId={userId} accessToken={accessToken} />} />
                <Route path="work-week" element={<WorkWeek userId={userId} accessToken={accessToken} />} />
                <Route path="file-manager" element={<FileManager userId={userId} accessToken={accessToken} />} />
            </Route>

            {/* Leave Routes */}
            <Route path="/leave" element={<Leave />}>
                <Route index element={<Navigate to="logs" replace />} />
                <Route path="logs" element={<Logs userId={userId} accessToken={accessToken} />} />
                <Route path="rules" element={<Rules userId={userId} accessToken={accessToken} />} />
                <Route path="balance" element={<Balance userId={userId} accessToken={accessToken} />} />
                <Route path="settings" element={<Settings userId={userId} accessToken={accessToken} />} />
            </Route>

            <Route path="directory" element={<Directory userId={userId} accessToken={accessToken} />} />
            <Route path="attendance" element={<Attendance userId={userId} accessToken={accessToken} />} />
            <Route path="payroll" element={<Payroll userId={userId} accessToken={accessToken} />} />
            <Route path="organizing-chart" element={<Chart userId={userId} accessToken={accessToken} />} />
            <Route path="holiday-calender" element={<Calender userId={userId} accessToken={accessToken} />} />
            <Route path="rewards" element={<Rewards userId={userId} accessToken={accessToken} />} />
        </Route>
    );
};

export default UserRoute;
