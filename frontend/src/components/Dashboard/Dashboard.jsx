import {
  faPlus,
  faUser,
  faAddressCard,
  faBook,
  faClock,
  faGear,
  faMoneyCheckDollar,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const cards = [
    { title: "Konnect", icon: faUser, color: "#6f1616" },
    { title: "ID & Visiting Card", icon: faAddressCard, color: "#36367e" },
    { title: "Directory", icon: faBook, color: "#c7c754" },
    { title: "Attendance", icon: faClock, color: "#9c5d9c" },
    { title: "Leave", icon: faHouse, color: "#fc8a81" },
    { title: "Payroll", icon: faMoneyCheckDollar, color: "#3c733c" },
    // { title: "Holiday Calendar", icon: faCalendarAlt },
    // { title: "My Profile", icon: faUser },
    // { title: "Organization Chart", icon: faProjectDiagram },
    { title: "Settings", icon: faGear, color: "darkgray" },
  ];

  const employeeCards = [
    { title: "Employees Onboard", value: 1, color: "#3c733c" },
    { title: "Employees No Activated", value: 0, color: "#fc8a81" },
    { title: "Invaid Email", value: 0, color: "#6f1616" },
    { title: "Mobile Number not verified", value: 0, color: "black" },
  ];

  return (
    <div className="row m-0 h-100 justify-content-between pt-4">
      {/* File */}
      <div className="col-lg-3 logo d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div className="dropzone d-flex justify-content-center align-items-center flex-column text-center p-4">
            <label htmlFor="file-upload">
              <FontAwesomeIcon
                icon={faPlus}
                className="mb-2"
                size="xl"
                color="#b14b4b"
              />
              <div className="fs-6 text-muted">
                Your Company logo comes here
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              className="file w-100 h-100"
              onChange={handleFileInputChange}
            />
          </div>
          {file && <div>Name: {file.name}</div>}
          <b className="pt-2">Karm Digitech</b>
        </div>
      </div>

      {/* Cards */}
      <div className="col-lg-6 cards d-flex flex-wrap">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card mb-3 mx-2 d-flex flex-column align-items-center justify-content-center card-hover p-4"
            style={{
              border: `1px solid ${card.color}`,
            }}
          >
            <div className="card-body m-0" style={{ flex: "0" }}>
              <FontAwesomeIcon
                icon={card.icon}
                size="3x"
                className="mb-2"
                color={card.color}
              />
            </div>
            <div className="text-center">
              <h5 className="card-title">{card.title}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Cards */}
      <div className="col-lg-3 employee-cards">
        <div
          className="card mb-3 mx-2 d-flex flex-column align-items-center justify-content-center px-3 py-2"
          style={{
            width: "100%",
            transition: "transform 0.3s",
          }}
        >
          {employeeCards.map((employeeCard, item) => (
            <div className="d-flex justify-content-between w-100" key={item}>
              <h5
                className="card-title"
                style={{ color: `${employeeCard.color}` }}
              >
                {employeeCard.title}
              </h5>
              <b>{employeeCard.value}</b>
            </div>
          ))}
          <div className="text-center">
            <button className="btn btn-secondary">Add Employee</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
