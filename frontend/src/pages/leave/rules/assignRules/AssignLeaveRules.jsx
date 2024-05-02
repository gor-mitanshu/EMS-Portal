import React from "react";
import CustomDataGrid from "../../../../UI/customDataGrid/CustomDataGrid";

const AssignLeaveRules = () => {
  const rows = [
    {
      id: 1,
      employee_name: "John Doe",
      department: "Engineering",
      manager: "Jane Smith",
      type: "Sick Leave",
      rules_applied: "Standard Rules",
      "sub-department": "Backend",
      designation: "Software Engineer",
      location: "New York",
      date_of_joining: "2022-01-01",
    },
    {
      id: 2,
      employee_name: "Alice Johnson",
      department: "Marketing",
      manager: "Bob Brown",
      type: "Vacation",
      rules_applied: "Flexible Rules",
      "sub-department": "Digital Marketing",
      designation: "Marketing Specialist",
      location: "Los Angeles",
      date_of_joining: "2021-06-15",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "custom-header",
      visible: true,
    },
    {
      field: "employee_name",
      headerName: "Employee Name",
      flex: 1,
      headerClassName: "custom-header",
      visible: true,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      headerClassName: "custom-header",
      visible: true,
    },
    {
      field: "sub-department",
      headerName: "Sub Department",
      flex: 1,
      headerClassName: "custom-header",
      visible: false,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      headerClassName: "custom-header",
      visible: false,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      headerClassName: "custom-header",
      visible: false,
    },
    {
      field: "date_of_joining",
      headerName: "Date of Joining",
      flex: 1,
      headerClassName: "custom-header",
      visible: false,
    },
    {
      field: "manager",
      headerName: "Manager",
      flex: 1,
      headerClassName: "custom-header",
      visible: true,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      headerClassName: "custom-header",
      visible: true,
    },
    {
      field: "rules_applied",
      headerName: "Rules Applied",
      flex: 1,
      headerClassName: "custom-header",
      visible: true,
    },
  ];
  return (
    <>
      <div className="card p-4">
        <div className="file-manager-container">
          <div className="row">
            <div className="col-md-12">
              <CustomDataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignLeaveRules;
