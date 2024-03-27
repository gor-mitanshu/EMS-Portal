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
      <div className="scroller scroller-left float-start mt-2">
        <i className="bi bi-caret-left-fill"></i>
      </div>
      <div className="scroller scroller-right float-end mt-2">
        <i className="bi bi-caret-right-fill"></i>
      </div>
      <div className="wrapper-nav">
        <nav className="nav nav-tabs list mt-2" id="myTab" role="tablist">
          {tabItems.map((tab, index) => (
            <div className="nav-item" key={index}>
              <button
                className={`nav-link btn ${
                  activeTab === tab.toLowerCase() ? "active" : ""
                }`}
                style={{ fontSize: "13px" }}
                onClick={() => handleTabChange(tab.toLowerCase())}
              >
                {tab}
              </button>
            </div>
          ))}
        </nav>
      </div>

      <div className="tab-content pt-3">
        {activeTab === "personal" && <Profile />}
        {/* {activeTab === "work" && <Work />}
        {activeTab === "team" && <Team />} */}
      </div>
    </div>
  );
};

export default TabsComponent;
