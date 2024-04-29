import React from "react";
import { Outlet } from "react-router-dom";
import "./TabComponentProfile.css";

const TabsComponent = () => {

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TabsComponent;
