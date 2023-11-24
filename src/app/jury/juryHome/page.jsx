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
    { field: "id", headerName: "Applicant ID", width: 200 },
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
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#373f6e",
            }}
          >
            <Link
              href={{
                pathname: "/jury/applicantView",
                query: { applicantId: params.id, id: juryID },
              }}
              style={{}}
            >
              Preview
            </Link>
          </Button>
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
      field: "status",
      headerName: "Result",
      width: 200,
      renderCell: (params) => {
        return (
          <select
            id="status"
            name="status"
            defaultValue={params.row.status}
            style={{
              backgroundColor:
                params.row.status === "Selected"
                  ? "green"
                  : params.row.status === "Rejected"
                  ? "red"
                  : "",
              color:
                params.row.status === "Rejected" ||
                params.row.status == "Selected"
                  ? "white"
                  : "black",
              width: "100%",
              padding: "5px",
              borderRadius: "5px",
            }}
            onChange={(e) => {
              rows.find((row) => row.id === params.id).status = e.target.value;
              params.row.status = e.target.value;
            }}
          >
            <option
              value=""
              style={{
                backgroundColor: "white",
              }}
            ></option>
            <option
              value="Selected"
              style={{
                backgroundColor: "green",
                color: "white",
              }}
            >
              Selected
            </option>
            <option
              value="Rejected"
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Rejected
            </option>
          </select>
        );
      },
    },
    {
      field: "save",
      headerName: "Save",
      width: 110,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "#373f6e",
            }}
            onClick={() => {
              saveData(params.row);
            }}
          >
            Save
          </Button>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);
  const router = useRouter();
  const useSearchParam = new useSearchParams(router.query);
  const juryID = useSearchParam.get("id");

  const saveData = (row) => {
    fetch("/api/admin/saveResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: row.id,
        status: row.status,
        comment: row.comment,
        juryId: juryID,
        userID: useSearchParam.get("id"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message == "Success") {
          alert("Saved Successfully");
        } else {
          alert("Error Occured");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    const id = useSearchParam.get("id");
    fetch("/api/admin/jurorBoard", {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        userID: useSearchParam.get("id"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRows(data);
      })
      .catch((err) => {
        console.log("error");
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
