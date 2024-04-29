import React from "react";
import Menu from "../../../assets/images/menu.png";
import SearchBar from "../../../UI/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../UI/Dropdown/Dropdown";

const NavbarComponent = ({ handleDrawerOpen }) => {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const menuItems = [
    { text: "Action", link: "/" },
    { text: "Another action", link: "/" },
    { text: "Something else here", link: "/" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-block">
        <div className="row justify-content-between align-items-center">
          {/* Menu Item and Brand Name */}
          <div className="col-lg-2 col-4 d-flex align-items-center">
            <div
              onClick={handleDrawerOpen}
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
              <Dropdown
                icon={<FontAwesomeIcon icon={faBell} />}
                menuItems={menuItems}
              />
            </div>
            <div className="px-2">
              <Dropdown
                icon={<FontAwesomeIcon icon={faUser} />}
                menuItems={menuItems}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
