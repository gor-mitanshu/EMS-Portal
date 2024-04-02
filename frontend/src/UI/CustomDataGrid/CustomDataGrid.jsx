import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const CustomDataGrid = ({ rows, columns }) => {
  return (
    <>
      <>
        <DataGrid
          rows={rows}
          columns={columns}
          density="comfortable"
          autoHeight
          // rowHeight={25}
          // headerHeight={56}
          getRowClassName={(params) => "custom-row"}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          headerFilters
        />
      </>
    </>
  );
};

export default CustomDataGrid;
