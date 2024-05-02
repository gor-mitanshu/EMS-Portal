import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/search/Search";
import Dropdown from "../../UI/dropdown/Dropdown";
import User from "../../assets/images/user.jpg";

const NavbarComponent = () => {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const menuItems = [
    { text: "Settings", link: "/" },
    { text: "File Manager", link: "/" },
    { text: "My Plan", link: "/" },
    { text: "Change Password", link: "/" },
    { text: "Logout", link: "/" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3 px-md-4">
      <div className="w-100 d-block">
        <div className="row justify-content-between align-items-center">
          <div className="col-4 d-lg-block d-none">
            <SearchBar />
          </div>
          <div className="col-lg-4 col-12 d-flex align-items-center justify-content-end">
            <div className="mx-2">{formattedDate}</div>
            <div className="mx-2">
              <Dropdown
                icon={<FontAwesomeIcon icon={faBell} className="fs-5" />}
                menuItems={menuItems}
              />
            </div>
            <div>
              <Dropdown
                icon={
                  <img
                    src={User}
                    alt="user_img"
                    height={"100%"}
                    width={"100%"}
                  />
                }
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
