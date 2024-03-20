import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState([]);

  const toggleMenu = (index) => {
    setActiveMenu((prevActive) => {
      const isActive = prevActive.includes(index);
      if (isActive) {
        return prevActive.filter((item) => item !== index);
      } else {
        return [...prevActive, index];
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="p-3">Menu</div>
      <hr />
      <ul>
        <li>Dashboard</li>
        <li onClick={() => toggleMenu(1)}>
          Company Profile
          <span className="icon">
            <FontAwesomeIcon
              icon={activeMenu.includes(1) ? faChevronUp : faChevronDown}
            />
          </span>
          {activeMenu.includes(1) && (
            <ul className="submenu">
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>
              <li>Submenu Item 3</li>
            </ul>
          )}
        </li>
        <li onClick={() => toggleMenu(2)}>
          My Profile
          <span className="icon">
            <FontAwesomeIcon
              icon={activeMenu.includes(2) ? faChevronUp : faChevronDown}
            />
          </span>
          {activeMenu.includes(2) && (
            <ul className="submenu">
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>
              <li>Submenu Item 3</li>
            </ul>
          )}
        </li>
        <li>Directory</li>
        <li onClick={() => toggleMenu(3)}>
          Attendance
          <span className="icon">
            <FontAwesomeIcon
              icon={activeMenu.includes(3) ? faChevronUp : faChevronDown}
            />
          </span>
          {activeMenu.includes(3) && (
            <ul className="submenu">
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>
              <li>Submenu Item 3</li>
            </ul>
          )}
        </li>
        <li onClick={() => toggleMenu(4)}>
          Leave
          <span className="icon">
            <FontAwesomeIcon
              icon={activeMenu.includes(4) ? faChevronUp : faChevronDown}
            />
          </span>
          {activeMenu.includes(4) && (
            <ul className="submenu">
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>
              <li>Submenu Item 3</li>
            </ul>
          )}
        </li>
        <li onClick={() => toggleMenu(5)}>
          Payroll
          <span className="icon">
            <FontAwesomeIcon
              icon={activeMenu.includes(5) ? faChevronUp : faChevronDown}
            />
          </span>
          {activeMenu.includes(5) && (
            <ul className="submenu">
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>
              <li>Submenu Item 3</li>
            </ul>
          )}
        </li>
        <li>Organization Chart</li>
        <li>Holiday Calendar</li>
        <li>Rewards</li>
      </ul>
    </div>
  );
};

export default Sidebar;
