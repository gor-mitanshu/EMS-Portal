import React from "react";

const WorkWeek = () => {
  const weeks = [
    ["present", "present", "present", "present", "present", "absent", "absent"],
    ["present", "present", "present", "present", "present", "absent", "absent"],
    ["present", "present", "present", "present", "present", "absent", "absent"],
    ["present", "present", "present", "present", "present", "absent", "absent"],
    ["present", "present", "present", "present", "present", "absent", "absent"],
  ];

  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });

  return (
    <div className="card p-3" style={{ cursor: "default" }}>
      <h3>Saturday Sunday Off</h3>
      {/* Description */}
      <h6 className="m-0 p-0 pt-3">Description</h6>
      <div style={{ color: "rgba(33, 37, 41, 0.75)" }}>
        This is a 5 Day Work Week rule with weekly off set as Saturday and
        Sunday
      </div>
      {/* Effective Date */}
      <h6 className="m-0 p-0 pt-3">Effective Date</h6>
      <div style={{ color: "rgba(33, 37, 41, 0.75)" }}>
        {currentDay}, {currentDate.getDate()} {currentMonth},{" "}
        {currentDate.getFullYear()}
      </div>
      <hr />
      {/* Rule Settings */}
      <h6 className="m-0 p-0 pt-3">Rule Settings</h6>
      <div className="d-flex justify-content-end pt-3">
        <input
          type="checkbox"
          name="half_day"
          className="pe-2"
          defaultChecked
          // onChange={}
          style={{ transform: "scale(1.5)" }}
        />
        <div style={{ paddingLeft: "5px" }}>Half Day</div>
      </div>

      {/* Work Week Table */}
      <table
        className="table caption-top table-bordered"
        style={{ cursor: "default" }}
      >
        <caption>Work Week Status</caption>
        <thead>
          <tr className="text-center">
            <th scope="col">Week</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
            <th scope="col">Saturday</th>
            <th scope="col">Sunday</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {weeks.map((week, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              {week.map((status, idx) => (
                <td key={idx}>
                  <div className={`status-indicator ${status}`}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex align-items-center">
        <div className="pe-2 d-flex align-items-center">
          <div className={`status-indicator present`}></div>&nbsp; Working Day
        </div>
        <div className="pe-2 d-flex align-items-center">
          <div className={`status-indicator absent`}></div>&nbsp;Leave Day
        </div>
        <div className="pe-2 d-flex align-items-center">
          <div className={`status-indicator half`}></div>&nbsp;Half Day
        </div>
      </div>
    </div>
  );
};

export default WorkWeek;
