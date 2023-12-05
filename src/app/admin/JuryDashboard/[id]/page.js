"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const columns = [
  { field: "name", headerName: "Applicant Name", width: 200 },
  { field: "email", headerName: "Applicant Email", width: 200 },
  { field: "phone", headerName: "Applicant Phone", width: 200 },
  { field: "comments", headerName: "Comments", width: 200 },
  {
    field: "status",
    headerName: "Result",
    width: 180,
    renderCell: (params) => (
      <Button
        variant="contained"
        color={
          params.row.status === ""
            ? "warning"
            : params.row.status === "rejected"
            ? "error"
            : "success"
        }
      >
        {params.row.status === ""
          ? "Not submitted"
          : params.row.status === "rejected"
          ? "Rejected"
          : "Selected"}
      </Button>
    ),
  },
];

export default function JuryResult({ params }) {
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);

  useEffect(() => {
    fetch("/api/admin/jurorBoard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id, userID: searchParams.get("id") }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ width: "90%" }}>
      <h1
        style={{
          color: "white",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        Juror {params.name}&apos;s Result Board
      </h1>
      <Link
        href={{
          pathname: "/admin/JuryDashboard",
          query: {
            id: searchParams.get("id"),
          },
        }}
        style={{
          marginLeft: "20px",
        }}
      >
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
        sx={{
          mt: 5,
          ml: 5,
          backgroundColor: "white",
        }}
      />
    </Box>
  );
}
