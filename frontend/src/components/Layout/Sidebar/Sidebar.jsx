import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      link: "/dashboard",
      icon: faHome,
      color: "blue",
      content: null,
    },
    {
      id: 2,
      title: "Company Profile",
      link: "/company-profile",
      icon: faBuilding,
      color: "black",
      content: [
        { title: "Address", link: "/company-profile/address" },
        { title: "Department", link: "/company-profile/department" },
        { title: "Designations", link: "/company-profile/designations" },
        { title: "Announcements", link: "/company-profile/announcements" },
        { title: "Policies", link: "/company-profile/policies" },
        { title: "Statutory", link: "/company-profile/statutory" },
        { title: "Info", link: "/company-profile/info" },
        { title: "Admins", link: "/company-profile/admins" },
        { title: "My Plan", link: "/company-profile/my-plans" },
      ],
    },
    {
      id: 3,
      title: "My Profile",
      link: "/my-profile",
      icon: faUser,
      color: "darkgrey",
      content: [
        { title: "Personal", link: "/my-profile/personal" },
        { title: "Work", link: "/my-profile/work" },
        { title: "Team", link: "/my-profile/team" },
        { title: "Education", link: "/my-profile/education" },
        { title: "Family", link: "/my-profile/family" },
        { title: "Documents", link: "/my-profile/documents" },
        { title: "File Manager", link: "/my-profile/file-manager" },
      ],
    },
    {
      id: 4,
      title: "Directory",
      link: "/directory",
      icon: faAddressBook,
      color: "orange",
      content: null,
    },
    {
      id: 5,
      title: "Attendance",
      link: "/attendance",
      icon: faClipboardCheck,
      color: "purple",
      content: [
        { title: "Logs", link: "/attendance/logs" },
        { title: "Rules", link: "/attendance/rules" },
        { title: "Approvals", link: "/attendance/approvals" },
        { title: "Settings", link: "/attendance/settings" },
      ],
    },
    {
      id: 6,
      title: "Leave",
      link: "/leave",
      icon: faCalendarAlt,
      color: "red",
      content: [
        { title: "Logs", link: "/leave/logs" },
        { title: "Rules", link: "/leave/rules" },
        { title: "Balance", link: "/leave/balance" },
      ],
    },
    {
      id: 7,
      title: "Payroll",
      link: "/payroll",
      icon: faMoneyCheckAlt,
      color: "green",
      content: [
        { title: "Run Payroll", link: "/payroll/run-payroll" },
        { title: "Setup Payroll", link: "/payroll/setup-payroll" },
        { title: "Declaration", link: "/payroll/declaration" },
        { title: "Advanced Settings", link: "/payroll/advance-settings" },
        { title: "Audit History", link: "/payroll/audit-history" },
      ],
    },
    {
      id: 8,
      title: "Organization Chart",
      link: "/organization-chart",
      icon: faSitemap,
      color: "cream",
      content: null,
    },
    {
      id: 9,
      title: "Holiday Calendar",
      link: "/holiday-calendar",
      icon: faCalendar,
      color: "brown",
      content: null,
    },
    {
      id: 10,
      title: "Rewards",
      link: "/rewards",
      icon: faAward,
      color: "",
      content: null,
    },
  ];

  const handleAccordionClick = (item) => {
    navigate(item.link);
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
                <h2 className="accordion-header ">
                  <button
                    className={`accordion-button collapsed list-btn ${
                      location.pathname === item.link ? "nav-active" : ""
                    }`}
                    // onClick={() => handleAccordionClick(item)}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded={open ? "true" : "false"}
                    aria-controls={`collapse${item.id}`}
                    style={{ padding: "14px" }}
                  >
                    <Link
                      to={item.link}
                      onClick={() => handleAccordionClick(item)}
                      className="text-decoration-none text-white"
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="menu-icon"
                        role="button"
                        size="lg"
                        color={`white`}
                      />
                      {item.title}
                    </Link>
                  </button>
                </h2>
                <div
                  id={open ? `collapse${item.id}` : ""}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${item.id}`}
                >
                  <div className="accordion-body list-item-body">
                    <ul className="list-unstyled">
                      {item.content.map((subItem, index) => (
                        <li
                          key={index}
                          className={`${
                            location.pathname === subItem.link
                              ? "nav-active"
                              : ""
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="sub-menu-icon"
                            role="button"
                            size="lg"
                            color={`white`}
                          />
                          <Link
                            to={subItem.link}
                            className={`text-decoration-none text-white`}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`accordion-item list ${
                location.pathname === item.link ? "nav-active" : ""
              }`}
            >
              <Link to={item.link} className="text-decoration-none text-white">
                <FontAwesomeIcon
                  icon={item.icon}
                  color={"white"}
                  style={{
                    paddingRight: "20px",
                    height: "18px",
                    // width: "24px"
                  }}
                  size="lg"
                />
                {item.title}
              </Link>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
