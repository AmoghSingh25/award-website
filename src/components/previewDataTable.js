import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export default function DataTable({
  rows,
  header,
  setRows,
  errors,
  showDelete,
}) {
  return (
    <div style={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "40px 40px 0px 0px",
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#FFEFB6",
              color: "#FFFFFF",
              borderRadius: "40px",
              boxShadow: "none",
              border: "none",
            }}
          >
            <TableRow>
              <TableCell>S.No.</TableCell>
              {header.map((head) => (
                <TableCell key={head.field}>{head.headerName}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: "#F7F7F7",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                {header.map((head) => (
                  <TableCell
                    key={head.field}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    type={head.type}
                    fullWidth
                    value={row[head.field]}
                    onChange={(e) => {
                      row[head.field] = e.target.value;
                      setRows([...rows]);
                    }}
                    error={
                      !!errors[row.id - 1] && !!errors[row.id - 1][head.field]
                    }
                    helperText={
                      errors[row.id - 1] && errors[row.id - 1][head.field]
                    }
                  >
                    {row[head.field]}
                  </TableCell>
                ))}

                <TableCell>
                  {showDelete && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        rows = rows.filter((row) => row.id !== rows.length);
                        setRows([...rows]);
                      }}
                      sx={{
                        backgroundColor: "#EB4F5A",
                        borderRadius: "20px",
                        color: "white",
                        opacity: "1",
                        boxShadow: "none",

                        ":hover": {
                          backgroundColor: "#EB4F5A",
                        },
                      }}
                    >
                      <DeleteIcon color="red" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
