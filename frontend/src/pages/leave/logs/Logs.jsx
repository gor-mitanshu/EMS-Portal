import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";
import CustomDataGrid from "../../../UI/customDataGrid/CustomDataGrid";

const Logs = () => {
  const rows = [
    {
      id: 1,
      employee_name: "John Doe",
      department: "Marketing",
      type: "Annual Leave",
      start_date: "2024-04-01",
      end_date: "2024-04-05",
      days: 5,
    },
    {
      id: 2,
      employee_name: "Jane Smith",
      department: "Human Resources",
      type: "Sick Leave",
      start_date: "2024-04-03",
      end_date: "2024-04-03",
      days: 1,
    },
    {
      id: 3,
      employee_name: "Alice Johnson",
      department: "Finance",
      type: "Maternity Leave",
      start_date: "2024-04-02",
      end_date: "2024-04-30",
      days: 29,
    },
  ];

  const columns = [
    {
      field: "employee_name",
      headerName: "Employee Name",
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
      field: "type",
      headerName: "Type",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "days",
      headerName: "Days",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => console.log("Edit clicked")}
          >
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => console.log("Delete clicked")}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </div>
      ),
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

export default Logs;
