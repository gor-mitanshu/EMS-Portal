import React, { useState } from "react";

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
      <ul className="nav nav-tabs">
        {tabItems.map((tab, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link btn ${
                activeTab === tab.toLowerCase() ? "active" : ""
              }`}
              onClick={() => handleTabChange(tab.toLowerCase())}
            >
              {tab}
            </button>
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
