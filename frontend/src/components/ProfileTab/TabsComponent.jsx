import React, { useState } from "react";
import Profile from "./Profile/PersonalProfile";
import "./TabComponentProfile.css";
import Work from "./Work/Work";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(() => {
    // Retrieve active tab from localStorage or default to "personal"
    return localStorage.getItem("activeTab") || "personal";
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Save active tab to localStorage
    localStorage.setItem("activeTab", tab);
  };

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
      <div className="d-flex justify-content-center">
        <ul
          className="nav nav-tabs flex-nowrap overflow-auto tabs-container"
          style={{ maxWidth: "70%" }}
        >
          {tabItems.map((tab, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link btn nav-button ${
                  activeTab === tab.toLowerCase() ? "active" : ""
                }`}
                onClick={() => handleTabChange(tab.toLowerCase())}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-content pt-4">
        {activeTab === "personal" && <Profile />}
        {activeTab === "work" && <Work />}
        {/* {activeTab === "team" && <Team />} */}
      </div>
    </div>
  );
};

export default TabsComponent;
