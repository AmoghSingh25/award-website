"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Applicant ID", width: 90 },
  {
    field: "firstName",
    headerName: "Applicant Name",
    width: 150,
  },
  {
    field: "preview",
    headerName: "Preview",
    width: 70,
    renderCell: (params) => {
      return <a href={"/admin/applicantView?id=" + params.id}>Click here</a>;
    },
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 110,
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

const rows = [
  {
    id: 1,
    firstName: "John",
    comment: "",
    result: "",
    save: "",
  },
  {
    id: 2,
    firstName: "Jane",
    preview: "https://example.com/image2.jpg",
    comment: "",
    result: "",
    save: "",
  },
  {
    id: 3,
    firstName: "Bob",
    preview: "https://example.com/image3.jpg",
    comment: "",
    result: "",
    save: "",
  },
  {
    id: 4,
    firstName: "Alice",
    preview: <a>https://example.com/image4.jpg</a>,
    comment: "",
    result: "",
    save: "",
  },
  {
    id: 5,
    firstName: "Charlie",
    preview: "https://example.com/image5.jpg",
    comment: "",
    result: "",
    save: "",
  },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
