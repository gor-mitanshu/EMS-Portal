import React from "react";

const DepartmentList = ({ department, subdepartments = [] }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Department: {department}</h3>
      <ul>
        {subdepartments.map((subdepartment, index) => (
          <li key={index}>
            Subdepartment {index + 1}: {subdepartment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
