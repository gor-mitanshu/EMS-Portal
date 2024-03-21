import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Dashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="row h-100 justify-content-between pt-4">
      <div className="col-lg-3 logo d-flex justify-content-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="dropzone"
            style={{
              width: "150px",
              height: "120px",
              border: "1px dashed #999",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
              position: "relative",
              padding: "20px",
            }}
          >
            <label htmlFor="file-upload">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: "24px", marginBottom: "8px" }}
              />
              <div style={{ fontSize: "14px" }}>
                Your Company logo comes here
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              className="file"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={handleFileInputChange}
            />
          </div>
          <div>Company Name</div>
        </div>
      </div>
      <div className="col-lg-6 cards"></div>
      <div className="col-lg-3 employee-cards"></div>
    </div>
  );
};

export default Dashboard;
