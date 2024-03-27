import React from "react";
import { Link, useLocation } from "react-router-dom";

const TabsComponent = () => {
  const location = useLocation();
  const activeTab = location.pathname.substring(1); // Extract the active tab from the URL

  const tabItems = [
    "Personal",
    "Work",
    "Team",
    "Education",
    "Family",
    "Documents",
    "WorkWeek",
    "Attendance",
    "Leave",
    "Payroll",
    "FileManager",
  ];

  return (
    <div className="container">
      <ul className="nav nav-tabs">
        {tabItems.map((tab, index) => (
          <li className="nav-item" key={index}>
            <Link
              to={`/${tab.toLowerCase()}`}
              className={`nav-link ${
                activeTab === tab.toLowerCase() ? "active" : ""
              }`}
            >
              {tab}
            </Link>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabItems.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane fade ${
              activeTab === tab.toLowerCase() ? "show active" : ""
            }`}
            id={tab.toLowerCase()}
          >
            {tab} content
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
