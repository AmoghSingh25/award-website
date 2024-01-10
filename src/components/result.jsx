"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import XLSX from "xlsx";

export default function JuryResult() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const searchParams = new useSearchParams(router.query);

  const columns = [
    {
      field: "applicantname",
      headerName: "Applicant Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Applicant Email",
      width: 300,
    },
    {
      field: "phone",
      headerName: "Applicant Phone",
      width: 200,
    },
    { field: "juryname", headerName: "Jury Name", width: 200 },
    { field: "comment", headerName: "Comments", width: 200 },
    { field: "score", headerName: "Score", width: 100 },
    // {
    //   field: "review_status",
    //   headerName: "Result",
    //   width: 180,

    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       color={
    //         params.row.review_status === ""
    //           ? "warning"
    //           : params.row.review_status === "Rejected"
    //           ? "error"
    //           : "success"
    //       }
    //     >
    //       {params.row.review_status === ""
    //         ? "Not submitted"
    //         : params.row.review_status === "Rejected"
    //         ? "Rejected"
    //         : "Selected"}
    //     </Button>
    //   ),
    // },
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

  const handleDownload = (rows) => {
    let sheet1_rows = [];
    const keys = Object.keys(rows);
    const columns = [
      "applicantname",
      "phone",
      "email",
      "juryname",
      "score",
      "comment",
    ];
    keys.forEach((row, id) => {
      let applicant_response = [];
      delete rows[row].id;
      delete rows[row].jury_id;
      columns.forEach((column) => {
        applicant_response.push(rows[row][column]);
      });
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jury Results");
    XLSX.writeFile(workbook, "JuryResults.xlsx", { compression: true });
  };

  return (
    <Box sx={{ width: "95%", pl: 3, pt: 3 }}>
      <h3
        style={{
          color: "#ffffff",
        }}
      >
        Result Board
      </h3>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDownload(rows, columns)}
      >
        Download Data
      </Button>

      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        disableVirtualization
        // disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[25, 50, 100, 200, 500]}
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
