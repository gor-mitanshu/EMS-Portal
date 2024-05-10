import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/search/Search";
import karmLogo from "../../assets/images/karm-logo.png";
import kLogo from "../../assets/images/k-logo.svg";

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    icon: "bi-columns-gap",
    color: "blue",
    content: null,
  },
  {
    id: 2,
    title: "Company Profile",
    link: "/company-profile",
    icon: "bi-building",
    color: "black",
    content: [
      { title: "Company", link: "/company-profile/overview" },
      { title: "Department", link: "/company-profile/department" },
      { title: "Designations", link: "/company-profile/designations" },
      { title: "Announcements", link: "/company-profile/announcements" },
      { title: "Policies", link: "/company-profile/policies" },
      { title: "Statutory", link: "/company-profile/statutory" },
      { title: "Info", link: "/company-profile/info" },
      { title: "Admins", link: "/company-profile/admin" },
      { title: "My Plan", link: "/company-profile/my-plans" },
    ],
  },
  {
    id: 3,
    title: "My Profile",
    link: "/my-profile",
    icon: "bi-person-fill",
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
    icon: "bi-person-video2",
    color: "orange",
    content: null,
  },
  {
    id: 5,
    title: "Attendance",
    link: "/attendance",
    icon: "bi-calendar3",
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
    icon: "bi-calendar-x",
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
    icon: "bi-coin",
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
    icon: "bi-diagram-2",
    color: "cream",
    content: null,
  },
  {
    id: 9,
    title: "Holiday Calendar",
    link: "/holiday-calendar",
    icon: "bi-calendar4-week",
    color: "brown",
    content: null,
  },
  {
    id: 10,
    title: "Rewards",
    link: "/rewards",
    icon: "bi-gift",
    color: "",
    content: null,
  },
];

const Sidebar = ({ open, handleDrawerOpen }) => {
  const location = useLocation();
  // const navigate = useNavigate();

  // const handleAccordionClick = (item) => {
  //   navigate(item.link);
  // };

  return (
    <div
      className={`sidebar ${open ? "" : "sidebar-sm"}`}
      onMouseEnter={() => {
        handleDrawerOpen(true);
      }}
      onMouseLeave={() => {
        handleDrawerOpen(false);
      }}
    >
      {/* <div className={`sidebar ${open ? "" : "sidebar-sm"}`}> */}

      <div
        style={{ minWidth: "260px" }}
        className="d-flex align-items-center justify-content-between p-3"
      >
        <Link
          onClick={() => {
            handleDrawerOpen(true);
          }}
          style={{ width: "244px" }}
          className="d-flex align-items-center py-2"
        >
          <img src={kLogo} width={"13%"} height={"100%"} alt="" />
          <img
            src={karmLogo}
            width={"60%"}
            height={"100%"}
            alt=""
            className="ms-3 karm-logo"
          />
        </Link>
        <div>
          {open ? (
            <div
              className="text-end d-flex d-lg-none"
              onClick={() => {
                handleDrawerOpen(false);
              }}
              role="button"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="sidebar-content">
        {open && (
          <div className="row pe-3">
            <div className="col-xs-12 d-lg-none">
              <SearchBar />
            </div>
          </div>
        )}

        <div className="accordion" id="sideBarMenuAccordion">
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.content ? (
                <div className="accordion-item border-0 menu-item-wrapper">
                  <button
                    className={`accordion-button collapsed menu-item ${location.pathname.includes(item.link) ? "menu-active" : ""
                      } ${open ? "" : "collapsed"}`}
                    // onClick={() => handleAccordionClick(item)}
                    onClick={() => {
                      handleDrawerOpen(true);
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded={open ? true : false}
                    aria-controls={`collapse${item.id}`}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <h6 className="m-0">{item.title}</h6>
                  </button>
                  <div
                    id={open ? `collapse${item.id}` : ""}
                    className={`accordion-collapse collapse ${open ? "" : "hide"
                      } `}
                    aria-labelledby={`heading${item.id}`}
                    data-bs-parent="#sideBarMenuAccordion"
                  >
                    <div className="accordion-body list-item-body">
                      {item.content.map((subItem, index) => (
                        <Link
                          onClick={() => {
                            handleDrawerOpen(false);
                          }}
                          key={index}
                          to={subItem.link}
                          className={`menu-item ${location.pathname === subItem.link
                              ? "nav-active"
                              : ""
                            }`}
                        >
                          <div className="sidebar-dash"></div>
                          <h6 className="m-0">{subItem.title}</h6>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="menu-item-wrapper">
                  <Link
                    to={item.link}
                    onClick={() => {
                      handleDrawerOpen(false);
                    }}
                    className={`menu-item ${location.pathname === item.link ? "nav-active" : ""
                      }`}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <h6 className="m-0">{item.title}</h6>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
