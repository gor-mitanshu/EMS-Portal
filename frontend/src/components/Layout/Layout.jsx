import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import NavbarComponent from "./Navbar/Navbar";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="layout">
        <NavbarComponent handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
