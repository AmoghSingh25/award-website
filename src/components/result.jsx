"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import downloadCsv from "download-csv";
const columns = [
  { field: "id", headerName: "Applicant ID", width: 120 },
  { field: "applicant", headerName: "Applicant Name", width: 200 },
  { field: "jury", headerName: "Jury Name", width: 200 },
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
        {params.row.Result ? "Selected" : "Rejected"}
      </Button>
    ),
  },
];

const rows = [
  {
    id: 1,
    jury: "Jury 1",
    applicant: "Applicant 1",
    Comments: "good",
    Result: true,
  },
  {
    id: 2,
    jury: "Jury 2",
    applicant: "Applicant 2",
    Comments: "bad",
    Result: false,
  },
  {
    id: 3,
    jury: "Jury 3",
    applicant: "Applicant 3",
    Comments: "good",
    Result: true,
  },
  {
    id: 4,
    jury: "Jury 4",
    applicant: "Applicant 4",
    Comments: "bad",
    Result: false,
  },
  {
    id: 5,
    jury: "Jury 5",
    applicant: "Applicant 5",
    Comments: "good",
    Result: true,
  },
];

const Download = () => {
  downloadCsv(rows, columns, "result");
};

export default function juryResult() {
  return (
    <Box sx={{ height: 700, width: "70%" }}>
      <h3>
        Result Board
        <Button variant="contained" onClick={() => Download()}>
          Download Result
        </Button>
      </h3>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5} // You can adjust the number of rows per page
      />
    </Box>
  );
}
