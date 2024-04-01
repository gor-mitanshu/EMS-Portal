import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const FileManager = () => {
  const rows = [
    //     { id: 1, col1: "Hello", col2: "World" },
    //     { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    //     { id: 3, col1: "MUI", col2: "is Amazing" },
  ];
  const columns = [
    { field: "request_type", headerName: "Request Type", flex: 1 },
    { field: "format", headerName: "Format", flex: 1 },
    { field: "schedule_on", headerName: "Schedule On", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "actions", headerName: "Actions", flex: 1 },
  ];
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataGrid
            rows={rows}
            columns={columns}
            density="comfortable"
            rowHeight={25}
            //   getRowClassName={(params) => {
            //     return "custom-row-class";
            //   }}
          />
        </div>
      </div>
    </>
  );
};

export default FileManager;
