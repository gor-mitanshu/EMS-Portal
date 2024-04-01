import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./TabComponentProfile.css";

const TabsComponent = () => {
  const location = useLocation();

  const tabItems = [
    { title: "Personal", path: "/my-profile/personal" },
    { title: "Work", path: "/my-profile/work" },
    { title: "Team", path: "/my-profile/team" },
    { title: "Education", path: "/my-profile/education" },
    { title: "Family", path: "/my-profile/family" },
    { title: "Documents", path: "/my-profile/documents" },
    { title: "Work Week", path: "/work-week" },
    { title: "Attendance", path: "/attendance" },
    { title: "Leave", path: "/leave" },
    { title: "Payroll", path: "/payroll" },
    { title: "FileManager", path: "/my-profile/file-manager" },
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <ul className="nav nav-tabs flex-nowrap overflow-auto tabs-container">
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

      <div className="tab-content pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TabsComponent;
