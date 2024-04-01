import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const Logs = () => {
  const rows = [];

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
              <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                density="comfortable"
                // rowHeight={25}
                // headerHeight={56}
                getRowClassName={(params) => "custom-row"}
                slots={{ toolbar: GridToolbar }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logs;
