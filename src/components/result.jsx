"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import downloadCsv from "download-csv";
import * as XLSX from "xlsx";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function JuryResult() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const searchParams = new useSearchParams(router.query);

  const columns = [
    { field: "applicantname", headerName: "Applicant Name", width: 200 },
    { field: "email", headerName: "Applicant Email", width: 300 },
    { field: "phone", headerName: "Applicant Phone", width: 200 },
    { field: "juryname", headerName: "Jury Name", width: 200 },
    { field: "comment", headerName: "Comments", width: 200 },
    {
      field: "review_status",
      headerName: "Result",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={
            params.row.review_status === ""
              ? "warning"
              : params.row.review_status === "rejected"
              ? "error"
              : "success"
          }
        >
          {params.row.review_status === ""
            ? "Not submitted"
            : params.row.review_status === "rejected"
            ? "Rejected"
            : "Selected"}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetch("/api/admin/getApplicantResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ width: "95%", pl: 3, pt: 3 }}>
      <h3
        style={{
          color: "#ffffff",
        }}
      >
        Result Board
      </h3>

      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        disableVirtualization
        // disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        columns={columns}
        pageSize={5}
        loading={loading}
        sx={{
          mt: 5,
          ml: 5,
          backgroundColor: "white",
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
