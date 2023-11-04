"use client";
import * as React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
const columns = [
  { field: "id", headerName: "Applicant ID", width: 250 },
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
];

export default function applicantDashboard() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    fetch("/api/admin/getApplicants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminId: "tRw5pSZbJC[u4y!MV+3r",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRows(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ height: 700, width: "90%" }}>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
        disableColumnSelector
      />
    </Box>
  );
}
