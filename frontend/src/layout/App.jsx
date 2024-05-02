import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = (isOpen) => {
    isOpen ? setOpen(true) : setOpen(false);
  };

  return (
    <>
      <div className="layout">
        <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
        <div className="content-wrapper">
          <Navbar />
          <div className="content p-3 p-md-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
