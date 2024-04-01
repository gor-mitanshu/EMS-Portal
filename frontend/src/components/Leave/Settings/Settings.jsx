import React, { useState } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";

const Settings = () => {
  const [isFinancialYearCycleEnabled, setIsFinancialYearCycleEnabled] =
    useState(false);
  const [isSkipLevelApprovalEnabled, setIsSkipLevelApprovalEnabled] =
    useState(false);

  const handleFinancialYearCycleToggle = () => {
    setIsFinancialYearCycleEnabled((prev) => !prev);
  };

  const handleSkipLevelApprovalToggle = () => {
    setIsSkipLevelApprovalEnabled((prev) => !prev);
  };

  return (
    <>
      <div className="col-md-12">
        <ProfileField title={"Annual Leave Cycle"}>
          <div className="d-flex justify-content-between">
            <div>
              Enable Financial Year Cycle (Default is Calendar Year Cycle)
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="financialYearCycle"
                checked={isFinancialYearCycleEnabled}
                onChange={handleFinancialYearCycleToggle}
              />
              <label className="form-check-label" htmlFor="financialYearCycle">
                {isFinancialYearCycleEnabled ? "On" : "Off"}
              </label>
            </div>
          </div>
        </ProfileField>
        <ProfileField title={"Multi-Level Approval"}>
          <div className="d-flex justify-content-between">
            <div>Enable Skip Level Approval (Your Manager's Reporter)</div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="skipLevelApproval"
                checked={isSkipLevelApprovalEnabled}
                onChange={handleSkipLevelApprovalToggle}
              />
              <label className="form-check-label" htmlFor="skipLevelApproval">
                {isSkipLevelApprovalEnabled ? "On" : "Off"}
              </label>
            </div>
          </div>
        </ProfileField>
      </div>
    </>
  );
};

export default Settings;
