import React from "react";

const StepTwo = ({ formDataStep2, handleChangeStep2, handleBackStep }) => {
  return (
    <>
      <div className="d-flex flex-column">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputCompanyName">Company Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCompanyName"
              name="companyName"
              value={formDataStep2.companyName}
              onChange={handleChangeStep2}
              placeholder="Enter Your Company Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCompanySize">Company Size</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCompanySize"
              name="companySize"
              value={formDataStep2.companySize}
              onChange={handleChangeStep2}
              placeholder="Enter Your Company Size"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmployeeStrength">
              Employee Strength
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmployeeStrength"
              name="employeeStrength"
              value={formDataStep2.employeeStrength}
              onChange={handleChangeStep2}
              placeholder="Enter Your Employee Strength"
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBackStep}
              style={{ marginRight: "6px" }}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StepTwo;
