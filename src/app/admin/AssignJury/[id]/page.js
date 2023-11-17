"use client";
import react from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "name",
    headerName: "Jury Name",
    width: 300,
    editable: false,
  },
  {
    field: "count",
    headerName: "Total Assigned Applicants",
    width: 300,
    editable: false,
  },
];

export default function AssignJury({ params }) {
  const [rows, setRows] = react.useState([]);
  const router = useRouter();

  const searchParams = new useSearchParams(router.query);

  const updateJury = (juryID) => {
    fetch("/api/admin/updateJuryApplicant", {
      method: "POST",
      body: JSON.stringify({
        jury: juryID,
        applicantID: params.id,
        userID: searchParams.get("id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const result = fetch("/api/admin/applicant_jury", {
      method: "POST",
      body: JSON.stringify({ id: params.id, userID: searchParams.get("id") }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRows(res.juryCount);
        setSelectedRows(res.selectedJury);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [selectedRows, setSelectedRows] = react.useState([]);

  return (
    <Box sx={{ height: "100%", width: "90%", ml: 2, mt: 4 }}>
      <h1>Applicant {params.id}&apos; Assign Board</h1>
      <Link
        href={{
          pathname: `/admin/ApplicantDashboard`,
          query: { id: params.id },
        }}
      >
        <Button>Back</Button>
      </Link>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        sx={{
          mt: 5,
          ml: 5,
          backgroundColor: "white",
        }}
      />
      <Button
        variant="contained"
        sx={{
          ml: 2,
        }}
        onClick={() => {
          updateJury(selectedRows);
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
