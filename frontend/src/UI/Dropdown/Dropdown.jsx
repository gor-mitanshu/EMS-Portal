const Dropdown = ({ icon, menuItems }) => {
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {icon}
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuButton"
      >
        {menuItems.map((item) => (
          <li key={item.text} className="d-flex align-items-center">
            <a className="dropdown-item" href="/">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
