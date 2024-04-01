import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Leave.css";

const Leave = () => {
  const location = useLocation();

  // for admin
  const adminTabItems = [
    { title: "Logs", path: "/leave/logs" },
    { title: "Rules", path: "/leave/rules" },
    { title: "Balance", path: "/leave/balance" },
    { title: "Settings", path: "/leave/settings" },
  ];

  // for user
  // const userTabItems = [
  //   { title: "Apply Leave", path: "/leave/apply-leave" },
  //   { title: "Logs", path: "/leave/logs" },
  //   { title: "Rules", path: "/leave/rules" },
  // ];
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-start">
          <ul className="nav nav-tabs flex-nowrap overflow-auto tabs-container text-nowrap">
            {adminTabItems.map((tab, index) => (
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
    </>
  );
};

export default Leave;
