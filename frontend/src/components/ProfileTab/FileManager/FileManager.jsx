import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const FileManager = () => {
  const rows = [
    {
      id: 1,
      request_type: "Type 1",
      format: "PDF",
      schedule_on: "2024-04-02",
      size: "2 MB",
      status: "Pending",
      actions: "View",
    },
    {
      id: 2,
      request_type: "Type 2",
      format: "CSV",
      schedule_on: "2024-04-03",
      size: "1 MB",
      status: "Completed",
      actions: "Download",
    },
    {
      id: 3,
      request_type: "Type 3",
      format: "XLSX",
      schedule_on: "2024-04-04",
      size: "3 MB",
      status: "Failed",
      actions: "Retry",
    },
  ];

  const columns = [
    {
      field: "request_type",
      headerName: "Request Type",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "format",
      headerName: "Format",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "schedule_on",
      headerName: "Schedule On",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "size",
      headerName: "Size",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "status",
      headerName: "Status",
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
    <div className="file-manager-container">
      <div className="row">
        <div className="col-md-12">
          <DataGrid
            rows={rows}
            columns={columns}
            density="comfortable"
            rowHeight={25}
            getRowClassName={(params) => "custom-row"}
          />
        </div>
      </div>
    </div>
  );
};

export default FileManager;
