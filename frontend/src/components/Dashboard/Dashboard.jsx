import {
  faPlus,
  faHouse,
  faSquareCheck,
  faCircleXmark,
  faEnvelope,
  faPhoneSlash,
  faLessThan,
  faArrowRightFromBracket,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Dashboard.css";
import ReactEcharts from "echarts-for-react";

const Dashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const cards = [
    {
      title: "Loss of Pay",
      icon: faLessThan,
      color: "#6f1616",
      backgroundColor: "rgba(247,112,98,0.6)",
      value: 4,
    },
    {
      title: "Work from Home",
      icon: faHouse,
      color: "#36367e",
      backgroundColor: "rgba(93,165,218,0.6)",
      value: 2,
    },
    {
      title: "Total Leave",
      icon: faArrowRightFromBracket,
      color: "#c7c754",
      backgroundColor: "rgba(222,207,63,0.5)",
      value: 20,
    },
    {
      title: "Comp Off",
      icon: faPerson,
      color: "#9c5d9c",
      backgroundColor: "rgba(193,94,243,0.3)",
      value: 0,
    },
  ];

  const employeeCards = [
    {
      title: "Employees Onboard",
      value: 1,
      color: "#3c733c",
      // backgroundColor: "linear-gradient(45deg,#2ed8b6,#59e0c5)",
      backgroundColor:
        "linear-gradient(45deg, rgb(152 246 227), rgb(234 234 234))",
      // backgroundColor: "#29a744",
      icon: faSquareCheck,
    },
    {
      title: "Employees No Activated",
      value: 0,
      color: "#fc8a81",
      icon: faCircleXmark,
      // backgroundColor: "linear-gradient(45deg,#FF5370,#ff869a)",
      backgroundColor:
        "linear-gradient(45deg, rgb(207 125 139), rgb(255 212 219))",
      // backgroundColor: "#dc3546",
    },
    {
      title: "Invaid Email",
      value: 0,
      color: "#b9b900",
      icon: faEnvelope,
      backgroundColor:
        "linear-gradient(45deg, rgb(255 212 151), rgb(255 216 160))",
    },
    {
      title: "Mobile Number not verified",
      value: 0,
      color: "black",
      icon: faPhoneSlash,
      backgroundColor: "#fff",
    },
  ];

  const option = {
    xAxis: {
      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    yAxis: {},
    series: [
      {
        type: "scatter",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
    ],
  };
  return (
    <>
      <div className="row m-0 px-2">
        {/* File */}
        <div className="col-lg-6 py-2">
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

        <div className="col-lg-6 py-2">
          <div className="cards">
            <ReactEcharts option={option} />
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div
        className="col-lg-12 employee-cards py-2"
        style={{ padding: "0 10rem" }}
      >
        <div className="row align-items-center justify-content-between">
          {employeeCards.map((employeeCard, index) => (
            <div key={index} className="col-lg-3 col-12 mb-3 px-3 py-2">
              <div
                className="card card-hover"
                style={{
                  cursor: "pointer",
                  // background: `${employeeCard.backgroundColor}`,
                  // border: `1px solid ${employeeCard.color}`,
                }}
              >
                <h6
                  className="card-title d-flex justify-content-center"
                  style={{
                    // color: "#333",
                    fontSize: "13px",
                    marginBottom: "5px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={employeeCard.icon}
                    size="xl"
                    className="px-2"
                    // color={employeeCard.color}
                  />
                  {employeeCard.title}
                </h6>
                {/* <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(employeeCard.value / 20) * 100}%`,
                      }}
                      aria-valuenow={employeeCard.value}
                      aria-valuemin="0"
                      aria-valuemax="20"
                    >
                      {employeeCard.value}
                    </div>
                  </div> */}
                <b style={{ color: "#333", fontSize: "1.2rem" }}>
                  {employeeCard.value}
                </b>
              </div>
            </div>
          ))}

          {cards.map((card, index) => (
            <div key={index} className="col-lg-3 col-12 mb-3 px-3 py-2">
              <div
                className="card card-hover"
                style={
                  {
                    // background: `${card.backgroundColor}`,
                    // border: `1px solid ${employeeCard.color}`,
                  }
                }
              >
                <h6
                  className="card-title d-flex justify-content-center"
                  style={{
                    // color: "#333",
                    fontSize: "13px",
                    marginBottom: "5px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={card.icon}
                    size="xl"
                    className="px-2"
                    // color={card.color}
                  />
                  {card.title}
                </h6>
                <b style={{ color: "#333", fontSize: "1.2rem" }}>
                  {card.value}
                </b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
