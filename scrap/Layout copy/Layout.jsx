import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import NavbarComponent from "./Navbar/Navbar";

const Layout = () => {
  //   const [open, setOpen] = useState(false);

  //   const handleDrawerOpen = () => {
  //     setOpen((toggle) => !toggle);
  //   };

  return (
    <div className="layout">
      {/* <NavbarComponent handleDrawerOpen={handleDrawerOpen} /> */}
      {/* <div className={open ? "content" : ""}> */}
      <Sidebar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
    //     </div>
  );
};

export default Layout;
