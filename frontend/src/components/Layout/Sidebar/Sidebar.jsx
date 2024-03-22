import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faUser,
  faAddressBook,
  faClipboardCheck,
  faCalendarAlt,
  faMoneyCheckAlt,
  faSitemap,
  faCalendar,
  faAward,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../UI/Search/Search";

const Sidebar = ({ open, handleDrawerOpen }) => {
  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: faHome,
      content: null,
      // color: "rgb(93,165,218)",
      color: "blue",
    },
    {
      id: 2,
      title: "Company Profile",
      icon: faBuilding,
      color: "black",
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
      icon: faUser,
      color: "darkgrey",
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
      icon: faAddressBook,
      content: null,
      color: "orange",
    },
    {
      id: 5,
      title: "Attendance",
      icon: faClipboardCheck,
      color: "purple",
      content: ["Logs", "Rules", "Approvals", "Settings"],
    },
    {
      id: 6,
      title: "Leave",
      icon: faCalendarAlt,
      color: "red",
      content: ["Logs", "Rules", "Balance"],
    },
    {
      id: 7,
      title: "Payroll",
      icon: faMoneyCheckAlt,
      color: "green",
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
      icon: faSitemap,
      content: null,
      color: "cream",
    },
    {
      id: 9,
      title: "Holiday Calendar",
      icon: faCalendar,
      content: null,
      color: "brown",
    },
    {
      id: 10,
      title: "Rewards",
      icon: faAward,
      content: null,
      color: "",
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
      <div
        className="d-flex align-items-center justify-content-end p-3"
        style={{ height: "72px" }}
      >
        {!open ? (
          <div onClick={handleDrawerOpen} role="button">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </div>
        ) : (
          <div
            className="text-end d-flex"
            onClick={handleDrawerOpen}
            role="button"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>
        )}
      </div>

      <div className="row">
        {open && (
          <div className="col-xs-12 d-lg-none">
            <SearchBar />
          </div>
        )}
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
                    style={{ padding: "14px" }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="menu-icon"
                      role="button"
                      size="lg"
                      color={`${item.color}`}
                    />
                    {item.title}
                  </button>
                </h2>
                <div
                  id={open ? `collapse${item.id}` : ""}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${item.id}`}
                >
                  <div className="accordion-body list-item-body">
                    <ul className="list-unstyled">
                      {listOrder[item.title].map((subItem, index) => (
                        <li key={index}>
                          <FontAwesomeIcon
                            icon={
                              menuItems.find((i) => i.title === item.title).icon
                            }
                            className="sub-menu-icon"
                          />
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="accordion-item list">
              <FontAwesomeIcon
                icon={item.icon}
                color={item.color}
                style={{
                  paddingRight: "20px",
                  height: "18px",
                  // width: "24px"
                }}
                size="lg"
              />
              {item.title}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
