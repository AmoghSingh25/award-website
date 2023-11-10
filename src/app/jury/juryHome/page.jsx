"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function JuryHome({ params }) {
  const columns = [
    { field: "id", headerName: "Applicant ID", width: 90 },
    {
      field: "name",
      headerName: "Applicant Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Applicant email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Applicant Phone",
      width: 150,
    },
    {
      field: "preview",
      headerName: "Preview",
      width: 100,
      renderCell: (params) => {
        // return <a href={"/jury/applicantView?id=" + params.id}>Click here</a>;
        return (
          <Link
            href={{
              pathname: "/jury/applicantView",
              query: { id: params.id, juryId: juryID },
            }}
          >
            Preview
          </Link>
        );
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 110,
      editable: true,
    },
    {
      field: "result",
      headerName: "Result",
      width: 110,
    },
    {
      field: "save",
      headerName: "Save",
      width: 110,
    },
  ];

  const [rows, setRows] = useState([]);
  const router = useRouter();
  const useSearchParam = new useSearchParams(router.query);
  const juryID = useSearchParam.get("id");

  useEffect(() => {
    const id = useSearchParam.get("id");
    fetch("/api/admin/jurorBoard", {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRows(data);
      });
  }, []);

  return (
    <Box sx={{ height: "90vh", width: "100%", mt: 1, ml: 1 }}>
      <h1>Jury - {useSearchParam.get("id")} </h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          mt: 5,
          ml: 5,
          backgroundColor: "white",
          height: "80%",
          p: 1,
        }}
      />
    </Box>
  );
}
