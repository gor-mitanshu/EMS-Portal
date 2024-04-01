import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const Balance = () => {
  const rows = [];

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

export default Balance;
