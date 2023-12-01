"use client";
import * as React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function JuryDashboard() {
  const [rows, setRows] = React.useState([]);
  const [jury, setJury] = React.useState([]);
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);
  const adminId = searchParams.get("id");

  const columns = [
    { field: "name", headerName: "Jury Name", width: 200 },
    { field: "email", headerName: "Jury Email", width: 200 },
    { field: "count", headerName: "Total Assigned Applicants", width: 200 },
    {
      field: "checkResult",
      headerName: "Check Result",
      width: 180,
      renderCell: (params) => (
        <Link
          href={{
            pathname: `/admin/JuryDashboard/${params.row.id}`,
            query: { id: adminId },
          }}
        >
          <Button variant="contained" color="primary">
            Check Result
          </Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    fetch("/api/admin/juryResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRows(res.juryCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ width: "90%" }}>
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
