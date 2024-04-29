import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <div className="d-flex align-items-center search-wrapper">
      <FontAwesomeIcon icon={faSearch} className="fs-5" />
      <input
        type="text"
        className="input search"
        placeholder="Search Employees"
        aria-label="Search Employees"
        aria-describedby="button-addon2"
      />
    </div>
  );
};

export default SearchBar;
