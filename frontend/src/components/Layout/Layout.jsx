import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import NavbarComponent from "./Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Clear activeTab from localStorage when moving from my-profile to dashboard
    if (location.pathname !== "/my-profile") {
      console.log("hhhhhh");
      localStorage.removeItem("activeTab");
    }
  }, [location.pathname]);
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
