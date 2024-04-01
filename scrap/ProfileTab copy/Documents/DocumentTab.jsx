import React, { useState } from "react";
import Id from "./Id/Id";
import Certificate from "./Certificate/Certificate";
import Work from "./Work/Work";

const DocumentTab = () => {
  const [subActiveTab, setSubActiveTab] = useState(() => {
    // Retrieve active tab from localStorage or default to "personal"
    return localStorage.getItem("subActiveTab") || "personal";
  });

  const handleTabChange = (tab) => {
    setSubActiveTab(tab);
    // Save active tab to localStorage
    localStorage.setItem("subActiveTab", tab);
  };

  const tabItems = ["ID", "Certificate", "Work"];
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {tabItems.map((tab, index) => (
              <li className="nav-item" key={index}>
                <button
                  className={`nav-link sub-nav-link ${
                    subActiveTab === tab.toLowerCase() ? "active" : ""
                  }`}
                  onClick={() => handleTabChange(tab.toLowerCase())}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            {subActiveTab === "id" && <Id />}
            {subActiveTab === "certificate" && <Certificate />}
            {subActiveTab === "work" && <Work />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTab;