import React from "react";

const WorkWeekTemplate = ({ workingDays }) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="container">
      <div className="row text-center">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`col ${
              workingDays.includes(day)
                ? "bg-success text-white"
                : "bg-danger text-white"
            } p-2`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Work Week</h1>
      <WorkWeekTemplate
        workingDays={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
      />
    </div>
  );
};

export default App;
