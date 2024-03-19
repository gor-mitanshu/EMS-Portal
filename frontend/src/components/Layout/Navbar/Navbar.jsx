import React, { useState } from "react";
import Menu from "../../../assets/menu.png";
import NotificationIcon from "../../../assets/notification.png";
import Person from "../../../assets/person.png";
import SearchBar from "../../../UI/Search/Search";

const NavbarComponent = ({ handleDrawerOpen }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!isOpen);
    handleDrawerOpen();
  };

  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-block">
        <div className="row justify-content-between align-items-center">
          {/* Menu Item and Brand Name */}
          <div className="col-lg-2 col-4 d-flex align-items-center">
            <div
              onClick={toggleSidebar}
              style={{ cursor: "pointer", paddingRight: "12px" }}
            >
              <img src={Menu} alt="" />
            </div>
            <a className="navbar-brand" href="/">
              Mini variant drawer
            </a>
          </div>

          {/* Logged User name and search bar */}
          <div className="col-lg-6 col-4 d-none d-md-flex align-items-center justify-content-evenly">
            <div className="pr-4">Gor Mitanshu</div>
            <SearchBar />
          </div>

          {/* Settings icon and profile */}
          <div className="col-lg-4 col-4 d-flex align-items-center justify-content-end">
            <div className="mr-4">{formattedDate}</div>
            <div className="px-2">
              <img src={NotificationIcon} alt="" />
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={Person} alt="" />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
