import React from "react";
import SearchBar from "../../../UI/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faBars } from "@fortawesome/free-solid-svg-icons";
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
    <nav
      className="navbar navbar-expand-lg navbar-light p-3"
      style={{
        background: "rgba(97, 168, 172,0.4)",
        boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container-fluid d-block">
        <div className="row justify-content-between align-items-center">
          {/* Menu Item and Brand Name */}
          <div className="col-lg-2 col-4 d-flex align-items-center p-0">
            <div className="pe-4" onClick={handleDrawerOpen} role="button">
              <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
            <div className="navbar-brand brand-name">Karm Digitech</div>
          </div>

          {/* Logged User name and search bar */}
          <div className="col-md-6  col-4 d-none d-md-flex col-0 align-items-center justify-content-center">
            <div className="col-12 col-lg-3 user-name fs-5">Hi, Mitanshu</div>
            <div className="col-9 d-lg-block d-none">
              <SearchBar />
            </div>
          </div>

          {/* Settings icon and profile */}
          <div className="col-lg-4 col-8 d-flex align-items-center justify-content-end">
            <div className="mr-4">{formattedDate}</div>
            <div>
              <Dropdown
                icon={<FontAwesomeIcon icon={faBell} />}
                menuItems={menuItems}
              />
            </div>
            <div>
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
