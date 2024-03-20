import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex align-items-center justify-content-between p-3">
        <div>Menu</div>
        <div className="text-end">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="accordion-item list">Dashboard</div>

      <div className="accordion" id="accordionExample">
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed list-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Company Profile
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body list-item-body ">
              <ul className="list-unstyled">
                <li>Address</li>
                <li>Department</li>
                <li>Designations</li>
                <li>Announcements</li>
                <li>Policies</li>
                <li>Statutory</li>
                <li>Info</li>
                <li>Admins</li>
                <li>My Plan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="accordionExample2">
        <div className="accordion-item" style={{ border: "none" }}>
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed list-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              My Profile
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample2"
          >
            <div className="accordion-body list-item-body ">
              <ul className="list-unstyled">
                <li>Work</li>
                <li>Team</li>
                <li>Education</li>
                <li>Family</li>
                <li>Documents</li>
                <li>File Manager</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion-item list">Directory</div>

      <div className="accordion" id="accordionExample3">
        <div className="accordion-item" style={{ border: "none" }}>
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed list-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Attendance
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample3"
          >
            <div className="accordion-body list-item-body ">
              <ul className="list-unstyled">
                <li>Logs</li>
                <li>Rules</li>
                <li>Approvals</li>
                <li>Settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="accordionExample4">
        <div className="accordion-item" style={{ border: "none" }}>
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed list-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Leave
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample4"
          >
            <div className="accordion-body list-item-body ">
              <ul className="list-unstyled">
                <li>Logs</li>
                <li>Rules</li>
                <li>Balance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="accordionExample5">
        <div className="accordion-item" style={{ border: "none" }}>
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed list-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Payroll
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample5"
          >
            <div className="accordion-body list-item-body ">
              <ul className="list-unstyled">
                <li>Run Payroll </li>
                <li>Setup Payroll</li>
                <li> Declaration</li>
                <li>Advanced Settings</li>
                <li>Audit History</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion-item list">Organization Chart</div>
      <div className="accordion-item list">Holiday Calendar</div>
      <div className="accordion-item list">Rewards</div>
    </div>
  );
};

export default Sidebar;
