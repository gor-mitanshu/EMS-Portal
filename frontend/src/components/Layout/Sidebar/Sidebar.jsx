import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../UI/Search/Search";

const Sidebar = ({ open, handleDrawerOpen }) => {
  // console.log(open);
  // console.log(handleDrawerOpen);

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      content: null,
    },
    {
      id: 2,
      title: "Company Profile",
      content: [
        "Address",
        "Department",
        "Designations",
        "Announcements",
        "Policies",
        "Statutory",
        "Info",
        "Admins",
        "My Plan",
      ],
    },
    {
      id: 3,
      title: "My Profile",
      content: [
        "Work",
        "Team",
        "Education",
        "Family",
        "Documents",
        "File Manager",
      ],
    },
    {
      id: 4,
      title: "Directory",
      content: null,
    },
    {
      id: 5,
      title: "Attendance",
      content: ["Logs", "Rules", "Approvals", "Settings"],
    },
    {
      id: 6,
      title: "Leave",
      content: ["Logs", "Rules", "Balance"],
    },
    {
      id: 7,
      title: "Payroll",
      content: [
        "Run Payroll",
        "Setup Payroll",
        "Declaration",
        "Advanced Settings",
        "Audit History",
      ],
    },
    {
      id: 8,
      title: "Organization Chart",
      content: null,
    },
    {
      id: 9,
      title: "Holiday Calendar",
      content: null,
    },
    {
      id: 10,
      title: "Rewards",
      content: null,
    },
  ];

  const listOrder = {
    "Company Profile": [
      "Address",
      "Department",
      "Designations",
      "Announcements",
      "Policies",
      "Statutory",
      "Info",
      "Admins",
      "My Plan",
    ],
    "My Profile": [
      "Work",
      "Team",
      "Education",
      "Family",
      "Documents",
      "File Manager",
    ],
    Attendance: ["Logs", "Rules", "Approvals", "Settings"],
    Leave: ["Logs", "Rules", "Balance"],
    Payroll: [
      "Run Payroll",
      "Setup Payroll",
      "Declaration",
      "Advanced Settings",
      "Audit History",
    ],
  };

  return (
    <div className={`sidebar ${open ? "" : "close"}`}>
      <div className="d-flex align-items-center justify-content-between p-3">
        <div>Menu</div>
        <div className="text-end" onClick={handleDrawerOpen} role="button">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 d-lg-none">
          <SearchBar />
        </div>
      </div>
      {menuItems.map((item) => (
        <React.Fragment key={item.id}>
          {item.content ? (
            <div className="accordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed list-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${item.id}`}
                  >
                    {item.title}
                  </button>
                </h2>
                <div
                  id={`collapse${item.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${item.id}`}
                >
                  <div className="accordion-body list-item-body">
                    <ul className="list-unstyled">
                      {listOrder[item.title].map((subItem, index) => (
                        <li key={index}>{subItem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="accordion-item list">{item.title}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
