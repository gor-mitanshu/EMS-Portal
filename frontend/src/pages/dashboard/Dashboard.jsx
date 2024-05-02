import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  faLinkedinIn,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.css";
import KarmDigitech from "../../assets/images/k-logo.svg";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const cards = [
    {
      title: "Total Employees",
      value: 4,
      icon: "bi-check2-all",
    },
    {
      title: "Employees Onboard",
      value: 1,
      icon: "bi-person-workspace",
    },
    {
      title: "Work from Home",
      value: 2,
      icon: "bi-house-door",
    },
    {
      title: "Employees No Activated",
      value: 1,
      icon: "bi-person-slash",
    },
    {
      title: "Total Leave",
      value: 18,
      icon: "bi-box-arrow-right",
    },
    {
      title: "Paid Leave",
      value: 9,
      icon: "bi-calendar2-check",
    },
    {
      title: "Unpaid Leave",
      value: 9,
      icon: "bi-calendar2-minus",
    },
    {
      title: "Leave Remains",
      value: 18,
      icon: "bi-calendar2-week",
    },
  ];

  const option = {
    series: [
      {
        data: [
          {
            x: "Code",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-04").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Validation",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-18").getTime(),
            ],
          },
        ],
      },
    ],
    options: {
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      chart: {
        zoom: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: "datetime",
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-12 col-lg-3 min-h-100">
          <div className="d-flex flex-column text-center h-100 p-3">
            <div className="d-flex justify-content-center align-items-center company-logo-wrapper">
              {/* <label htmlFor="file-upload" className="compony-logo-upload">
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
                className="d-none"
                onChange={handleFileInputChange}
              /> */}
              <img
                src={KarmDigitech}
                alt=""
                className="object-fit-contain"
                height={"100%"}
                width={"100%"}
              />
            </div>
            <h4 className="mt-4">Karm Digitech</h4>
            <div className="d-flex align-items-center justify-content-center">
              <Link
                to={"//www.linkdin.com"}
                target="_blank"
                className="linkdin-icon-wrapper"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
              <Link
                to={"//www.facebook.com"}
                target="_blank"
                className="facebook-icon-wrapper"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link
                to={"//www.instagram.com"}
                target="_blank"
                className="insta-icon-wrapper"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-9 min-h-100">
          <div className="card h-100">
            <h4 className="p-2">Total working hours</h4>
            <Chart
              options={option.options}
              series={option.series}
              type="rangeBar"
              width="100%"
              height="300"
            />
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="row justify-content-center">
        {cards.map((cardData, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-3 employee-card-wrapper mb-4"
          >
            <div className="card h-100 m-0">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-wrapper">
                  <i className={`bi ${cardData.icon}`} />
                </div>
                <h3 className="m-0 ps-3">{cardData.value}</h3>
              </div>
              <h5>{cardData.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
