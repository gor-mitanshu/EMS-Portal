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
    { title: "Konnect", icon: faUser },
    { title: "ID & Visiting Card", icon: faAddressCard },
    { title: "Directory", icon: faBook },
    { title: "Attendance", icon: faClock },
    { title: "Leave", icon: faHouse },
    { title: "Payroll", icon: faMoneyCheckDollar },
    // { title: "Holiday Calendar", icon: faCalendarAlt },
    // { title: "My Profile", icon: faUser },
    // { title: "Organization Chart", icon: faProjectDiagram },
    { title: "Settings", icon: faGear },
  ];

  return (
    <div className="row h-100 justify-content-between pt-4">
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
            className="card mb-3 mx-2 d-flex flex-column align-items-center justify-content-center card-hover"
            style={{
              width: "200px",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
          >
            <div className="card-body">
              <FontAwesomeIcon icon={card.icon} size="3x" className="mb-2" />
            </div>
            <div className="card-footer text-center">
              <h5 className="card-title">{card.title}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Cards */}
      <div className="col-lg-3 employee-cards"></div>
    </div>
  );
};

export default Dashboard;
