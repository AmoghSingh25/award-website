"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import downloadCsv from "download-csv";
import * as XLSX from "xlsx";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const columns = [
  { field: "id", headerName: "Applicant ID", width: 120 },
  { field: "applicantname", headerName: "Applicant Name", width: 200 },
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

const handleDownload = (rows, columns) => {
  rows.forEach((row, id) => {
    let key = Object.keys(row);
    console.log(key, id);
    row["question"] = row["question"].toString();
    row["subjects"] = row["subjects"].toString();
    row["answer"] = row["answer"].toString();
  });
  console.log(rows);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  // customize header names
  // XLSX.utils.sheet_add_aoa(worksheet, columns);

  XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
};

const Download = (userID) => {
  fetch("/api/admin/downloadData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: userID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const excel_col = Object.keys(data.data[0]);
      handleDownload(data.data, excel_col);
      // downloadCsv(data.data, excel_col, "applicants");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function JuryResult() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const searchParams = new useSearchParams(router.query);

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
    <Box sx={{ width: "90%", pl: 3, pt: 3 }}>
      <h3>Result Board</h3>
      <Button
        variant="contained"
        onClick={() => Download(searchParams.get("id"))}
      >
        Download Result
      </Button>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
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
