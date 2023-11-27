"use client";
import * as React from "react";
import { useEffect, Suspense, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import XLSX from "xlsx";

const handleDownload = (rows, columns) => {
  let sheet1_rows = [];
  const keys = Object.keys(rows);
  columns = [
    "email",
    "phone",
    "personalDetailsStatus",
    "supportingDocumentsStatus",
    "experienceDetailsStatus",
    "caseStudyStatus",
    "awardAchievementsStatus",
    "overallStatus",
    "name",
    "institute",
    "city",
    "district",
    "state",
    "teachingExp",
    "instituteExp",
    "subjects",
    "grade",
    "professionalMembership",
    "question1",
    "answer1",
    "question2",
    "answer2",
    "question3",
    "answer3",
  ];

  keys.forEach((row, id) => {
    let applicant_response = [];
    if (rows[row]["question"] !== undefined) {
      rows[row]["question"].forEach((question, index) => {
        applicant_response.push(question);
        applicant_response.push(rows[row]["answer"][index]);
      });
    }
    if (rows[row]["subjects"])
      rows[row]["subjects"] = rows[row]["subjects"].toString();
    delete rows[row]["question"];
    delete rows[row]["answer"];
    delete rows[row]["id"];
    for (const [key, value] of Object.entries(rows[row])) {
      if (key.includes("status")) {
        if (value === true) {
          rows[row][key] = "Completed";
        } else {
          rows[row][key] = "Not completed";
        }
      }
    }
    applicant_response = [...Object.values(rows[row]), ...applicant_response];
    sheet1_rows.push(applicant_response);
  });
  const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.json_to_sheet(sheet1_rows);
  const worksheet = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(worksheet, [columns]);
  XLSX.utils.sheet_add_json(worksheet, sheet1_rows, {
    origin: "A2",
    skipHeader: true,
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

  XLSX.writeFile(workbook, "Results.xlsx", { compression: true });
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
    .then((res) => {
      const excel_col = Object.keys(res.data[Object.keys(res.data)[0]]);
      handleDownload(res.data, excel_col);
      // downloadCsv(data.data, excel_col, "applicants");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function ApplicantDashboard() {
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);

  const columns = [
    { field: "name", headerName: "Applicant Name", width: 200 },
    { field: "email", headerName: "Applicant Email", width: 300 },
    { field: "phone", headerName: "Applicant Phone", width: 200 },
    {
      field: "assignJury",
      headerName: "Assign Jury",
      width: 140,
      renderCell: (params) => (
        <Link
          href={{
            pathname: `/admin/AssignJury/${params.row.id}`,
            query: { id: searchParams.get("id") },
          }}
        >
          <Button variant="contained" color="primary">
            Assign
          </Button>
        </Link>
      ),
    },
    {
      headerName: "View application",
      width: 180,
      renderCell: (params) => (
        <Button variant="contained" color="primary">
          <Link
            href={{
              pathname: "/admin/AssignJury/applicantView",
              query: { id: searchParams.get("id"), applicantId: params.row.id },
            }}
          >
            View{" "}
          </Link>
        </Button>
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
        userID: searchParams.get("id"),
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
    <Box sx={{ width: "90%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => Download(searchParams.get("id"))}
        >
          Download Applicant Data
        </Button>
      </div>
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
