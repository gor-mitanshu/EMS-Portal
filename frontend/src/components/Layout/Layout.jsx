import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import NavbarComponent from "./Navbar/Navbar";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = (isOpen) => {
    isOpen ? setOpen(true) : setOpen(false)
  };

  return (
    <>
      <div className="layout">
        <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
        <div className="content-wrapper">
          <NavbarComponent />
          <div className="content p-3 p-md-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
