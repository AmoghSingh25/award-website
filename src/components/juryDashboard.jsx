"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
const columns = [
  { field: "id", headerName: "Jury ID", width: 120 },
  { field: "name", headerName: "Jury Name", width: 200 },
  { field: "TAA", headerName: "Total Assigned Applicants", width: 200 },
  {
    field: "checkResult",
    headerName: "Check Result",
    width: 180,
    renderCell: (params) => (
      <Link href={`/admin/JuryDashboard/${params.row.id}`}>
        <Button variant="contained" color="primary">
          Check Result
        </Button>
      </Link>
    ),
  },
];

const rows = [
  { id: 1, name: "Juror 1", TAA: 3 },
  { id: 2, name: "Juror 2", TAA: 4 },
  { id: 3, name: "Juror 3", TAA: 2 },
  { id: 4, name: "Juror 4", TAA: 5 },
  { id: 5, name: "Juror 5", TAA: 1 },
  { id: 6, name: "Juror 6", TAA: 3 },
  { id: 7, name: "Juror 7", TAA: 4 },
  { id: 8, name: "Juror 8", TAA: 2 },
  { id: 9, name: "Juror 9", TAA: 5 },
  { id: 10, name: "Juror 10", TAA: 1 },
];

export default function JuryDashboard() {
  return (
    <Box sx={{ height: 700, width: "70%" }}>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5} // You can adjust the number of rows per page
      />
    </Box>
  );
}
