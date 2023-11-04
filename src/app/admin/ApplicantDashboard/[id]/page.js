"use client";
import react from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "JuryName",
    headerName: "Jury Name",
    width: 150,
    editable: true,
  },
  {
    field: "TAA",
    headerName: "Total Assigned Applicants",
    width: 300,
    editable: true,
  },
];

const rows = [
  { id: 1, JuryName: "Snow", TAA: 3 },
  { id: 2, JuryName: "Rose", TAA: 4 },
  { id: 3, JuryName: "John", TAA: 2 },
  { id: 4, JuryName: "Lily", TAA: 5 },
  { id: 5, JuryName: "David", TAA: 1 },
  { id: 6, JuryName: "Emma", TAA: 3 },
  { id: 7, JuryName: "Michael", TAA: 4 },
  { id: 8, JuryName: "Sophia", TAA: 2 },
  { id: 9, JuryName: "William", TAA: 5 },
  { id: 10, JuryName: "Olivia", TAA: 1 },
];

export default function AssignJury({params}) {
  console.log(params)
  const [selectedRows, setSelectedRows] = react.useState([]);
  return (
    <Box sx={{ height: 700, width: "70%" }}>
            <h1>
      Applicant {params.id}'s Assign Board
    </h1>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
          setSelectedRows(selectedRows);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          console.log(selectedRows); // add selected rows to the judges list. Also change Status to selected.
        }}
      >
        Submit
      </Button>
    </Box>
  );
}