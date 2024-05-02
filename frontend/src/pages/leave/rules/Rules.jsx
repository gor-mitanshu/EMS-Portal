import React, { useEffect, useState } from "react";
import AssignLeaveRules from "./assignRules/AssignLeaveRules";
import LeaveRules from "./leaveRules/LeaveRules";

const Rules = () => {
  const [subActiveTab, setSubActiveTab] = useState(() => {
    // Retrieve active tab from localStorage or default to "leave rules"
    return localStorage.getItem("subActiveTab") || "leave rules";
  });

  const handleTabChange = (tab) => {
    setSubActiveTab(tab);
    // Save active tab to localStorage
    localStorage.setItem("subActiveTab", tab);
  };

  useEffect(() => {
    // Clear subActiveTab from localStorage when unmounting
    return () => {
      localStorage.removeItem("subActiveTab");
    };
  }, []);

  const tabItems = ["Leave Rules", "Assign Leave Rules"];
  return (
    <>
      <div className="container">
        <div className="card text-start">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              {tabItems.map((tab, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`nav-link sub-nav-link ${
                      subActiveTab.toLowerCase() === tab.toLowerCase()
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              {subActiveTab.toLowerCase() === "leave rules" && <LeaveRules />}
              {subActiveTab.toLowerCase() === "assign leave rules" && (
                <AssignLeaveRules />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rules;
