import React from "react";
import CustomDataGrid from "../../../UI/customDataGrid/CustomDataGrid";

const Balance = () => {
  const rows = [
    { id: 1, employee: "John Doe", department: "HR", location: "New York" },
    {
      id: 2,
      employee: "Jane Smith",
      department: "Finance",
      location: "Chicago",
    },
    {
      id: 3,
      employee: "Alice Johnson",
      department: "IT",
      location: "San Francisco",
    },
  ];

  const columns = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      headerClassName: "custom-header",
    },
  ];
  return (
    <>
      <h3>Leave Logs</h3>
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

export default Balance;
