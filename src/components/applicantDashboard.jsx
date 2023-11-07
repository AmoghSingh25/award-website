"use client";
import * as React from "react";
import { useEffect, Suspense, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ApplicantDashboard() {
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);

  const columns = [
    { field: "id", headerName: "Applicant ID", width: 250 },
    { field: "name", headerName: "Applicant Name", width: 200 },
    {
      field: "assignJury",
      headerName: "Assign Jury",
      width: 140,
      renderCell: (params) => (
        <Link
          href={{
            pathname: `/admin/ApplicantDashboard/${params.row.id}`,
            query: { id: searchParams.get("id") },
          }}
        >
          <Button variant="contained" color="primary">
            Assign
          </Button>
        </Link>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setRows(data);
        setLoading(false);
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
        loading={loading}
        sx={{
          mt: 5,
          ml: 5,
          backgroundColor: "white",
        }}
      />
    </Box>
  );
}
