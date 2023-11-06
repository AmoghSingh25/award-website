"use client";
import * as React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

const columns = [
  { field: "id", headerName: "Jury ID", width: 300 },
  { field: "name", headerName: "Jury Name", width: 200 },
  { field: "count", headerName: "Total Assigned Applicants", width: 200 },
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

export default function JuryDashboard() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    fetch("/api/admin/juryResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRows(res.juryCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ height: 700, width: "90%" }}>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5} // You can adjust the number of rows per page
        sx={{
          mt: 5,
          ml: 5,
          backgroundColor: "white",
        }}
      />
    </Box>
  );
}
