import { useState } from "react";

const Dropdown = ({ icon, menuItems }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        {icon}
      </button>
      <ul
        className={`dropdown-menu ${isOpen ? "show" : ""} dropdown-menu-end`}
        aria-labelledby="dropdownMenuButton"
      >
        {menuItems.map((item, index) => (
          <li key={index}>
            <a className="dropdown-item" href={item.link}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
