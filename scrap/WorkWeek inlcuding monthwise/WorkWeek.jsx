import React from "react";

const WorkWeekTemplate = ({ workingDays }) => {
  return (
    <div className="container">
      <div className="row text-center">
        {workingDays.map((week, index) => (
          <div key={index} className="col">
            Week {index + 1}
            <div className="row">
              {week.map((day, idx) => (
                <div
                  key={idx}
                  className={`col ${
                    day ? "bg-success text-white" : "bg-danger text-white"
                  } p-2`}
                >
                  {day ? "W" : "O"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = new Date(today.getFullYear(), currentMonth, 1);
  const lastDayOfMonth = new Date(today.getFullYear(), currentMonth + 1, 0);
  const totalDaysInMonth = lastDayOfMonth.getDate();

  const weeks = [];
  let week = [];
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const currentDate = new Date(today.getFullYear(), currentMonth, i);
    const dayOfWeek = currentDate.getDay();
    week.push(dayOfWeek >= 1 && dayOfWeek <= 5); // Consider Monday to Friday as working days

    if (dayOfWeek === 0 || i === totalDaysInMonth) {
      weeks.push(week);
      week = [];
    }
  }

  return (
    <div>
      <h1>Work Month Template</h1>
      <WorkWeekTemplate workingDays={weeks} />
    </div>
  );
};

export default App;
