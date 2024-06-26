import React, { useEffect, useState } from "react";
import Id from "./identification/Id";
import Certificate from "./certificate/Certificate";
import Work from "./work/Work";

const DocumentTab = ({ userId, accessToken }) => {
  const [subActiveTab, setSubActiveTab] = useState(() => {
    // Retrieve active tab from localStorage or default to "personal"
    return localStorage.getItem("subActiveTab") || "id";
  });

  const handleTabChange = (tab) => {
    setSubActiveTab(tab);
    // Save active tab to localStorage
    localStorage.setItem("subActiveTab", tab);
  };

  useEffect(() => {
    // Clear subActiveTab from localStorage when moving from my-profile to dashboard
    return () => {
      localStorage.removeItem("subActiveTab");
    };
  }, []);

  const tabItems = ["ID", "Certificate", "Work"];
  return (
    <div>
      <div className="card text-start">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            { tabItems.map((tab, index) => (
              <li className="nav-item" key={ index }>
                <button
                  className={ `nav-link sub-nav-link ${subActiveTab === tab.toLowerCase() ? "active" : ""
                    }` }
                  onClick={ () => handleTabChange(tab.toLowerCase()) }
                >
                  { tab }
                </button>
              </li>
            )) }
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            { subActiveTab === "id" && <Id userId={ userId } accessToken={ accessToken } /> }
            { subActiveTab === "certificate" && <Certificate userId={ userId } accessToken={ accessToken } /> }
            { subActiveTab === "work" && <Work userId={ userId } accessToken={ accessToken } /> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTab;
