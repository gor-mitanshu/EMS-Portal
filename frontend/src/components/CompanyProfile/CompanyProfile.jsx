import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const CompanyProfile = () => {
  const location = useLocation();

  const tabItems = [
    { title: "Overview", path: "/company-profile/overview" },
    { title: "Address", path: "/company-profile/address" },
    { title: "Department", path: "/company-profile/department" },
    { title: "Designation", path: "/company-profile/designation" },
    { title: "Announcements", path: "/company-profile/announcements" },
    { title: "Policies", path: "/company-profile/policies" },
    { title: "Admin", path: "/company-profile/admin" },
    { title: "Statutory", path: "/company-profile/statutory" },
    { title: "My Plan", path: "/company-profile/my-plan" },
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <ul className="nav nav-tabs flex-nowrap overflow-auto tabs-container justify-content-between w-100 text-nowrap">
          {tabItems.map((tab, index) => (
            <li className="nav-item" key={index}>
              <Link
                to={tab.path}
                className={`nav-link btn nav-button ${
                  location.pathname === tab.path ? "active" : ""
                }`}
              >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-content pt-4 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyProfile;
