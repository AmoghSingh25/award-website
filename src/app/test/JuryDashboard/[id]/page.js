"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
const columns = [
  { field: "id", headerName: "Applicant ID", width: 120 },
  { field: "AssignedApplicants", headerName: "Applicant Name", width: 200 },
  { field: "Comments", headerName: "Comments", width: 200 },
  {
    field: "Result",
    headerName: "Result",
    width: 180,
    renderCell: (params) => (
<Button
            variant="contained"
            color={params.row.Result ? "success" : "error"}
          >
          {
            params.row.Result ? "Selected" : "Rejected"
          }
        </Button>
    ),
  },
];

const rows = [
  {
    id: 1,
    AssignedApplicants: "Applicant 1",
    Comments: "good",
    Result: true,
  },
  {
    id: 2,
    AssignedApplicants: "Applicant 2",
    Comments: "bad",
    Result: false,
  },
  {
    id: 3,
    AssignedApplicants: "Applicant 3",
    Comments: "good",
    Result: true,
  },
  {
    id: 4,
    AssignedApplicants: "Applicant 4",
    Comments: "bad",
    Result: false,
  },
  {
    id: 5,
    AssignedApplicants: "Applicant 5",
    Comments: "good",
    Result: true,
  },

];

export default function juryResult({params}) {
  return (
    
    <Box sx={{ height: 700, width: "70%" }}>
      <h1>
      Juror {params.id}'s Result Board
    </h1>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5} // You can adjust the number of rows per page
      />
    </Box>
  );
}
