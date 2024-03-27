import React, { useState } from "react";
import Profile from "./Profile/Profile";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
          className="nav nav-tabs flex-nowrap overflow-auto"
          style={{ maxWidth: "70%" }}
        >
          {tabItems.map((tab, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link btn nav-button ${
                  activeTab === tab.toLowerCase() ? "active" : ""
                }`}
                style={{
                  fontSize: "13px",
                  backgroundColor:
                    activeTab === tab.toLowerCase() ? "rgb(36 146 147)" : "",
                  color: activeTab === tab.toLowerCase() ? "#fff" : "black",
                }}
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
        {/* {activeTab === "work" && <Work />}
        {activeTab === "team" && <Team />} */}
      </div>
    </div>
  );
};

export default TabsComponent;
