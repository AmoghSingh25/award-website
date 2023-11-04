"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
const columns = [
  { field: "id", headerName: "Applicant ID", width: 120 },
  { field: "name", headerName: "Applicant Name", width: 200 },
  {
    field: "assignJury",
    headerName: "Assign Jury",
    width: 140,
    renderCell: (params) => (
      <Link href={`/admin/ApplicantDashboard/${params.row.id}`}>
        <Button variant="contained" color="primary">
          Assign
        </Button>
      </Link>
    ),
  },
  { field: "status", headerName: "Status", width: 120 },
];

const rows = [
  { id: 1, name: "John Doe", status: "Pending" },
  { id: 2, name: "Jane Smith", status: "Assigned" },
  { id: 3, name: "Alice Johnson", status: "Pending" },
  { id: 4, name: "Bob Brown", status: "Assigned" },
  { id: 5, name: "Eve Williams", status: "Pending" },
  { id: 6, name: "Chris Lee", status: "Pending" },
  { id: 7, name: "Grace Clark", status: "Assigned" },
  { id: 8, name: "Michael Wilson", status: "Pending" },
  { id: 9, name: "Olivia Davis", status: "Assigned" },
  { id: 10, name: "William Moore", status: "Assigned" },
];

export default function applicantDashboard() {
  return (
    <Box sx={{ height: 700, width: "70%" }}>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5} // You can adjust the number of rows per page
        checkboxSelection
      />
    </Box>
  );
}
