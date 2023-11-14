"use client";

import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import DataTable from "../../../components/dataTable";
import "./page.module.css";
import SectionHeader from "../../../components/sectionHeader";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup.object().shape({
  awards: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      year: yup
        .number("Must be a number")
        .typeError("Must be a number")
        .required()
        .positive()
        .integer()
        .min(1900)
        .max(2023),
      desc: yup.string().required(),
    })
  ),
  contrib: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      year: yup
        .number()
        .typeError("Must be a number")
        .positive()
        .integer()
        .min(1900)
        .max(2023),
      desc: yup.string().required(),
    })
  ),
});

export default function Page() {
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const [errors1, setErrors1] = useState({});
  const [errors2, setErrors2] = useState({});
  const [errorMessage, setError] = useState("");

  const assignErrors = (errors) => {
    let temp = {};
    errors.forEach((e) => {
      let index = e.path.split("[")[1].split("]")[0];
      let item = e.path.split("]")[1].split(".")[1];
      let message = e.message;
      if (!(item === "year" && e.message === "Must be a number")) {
        message = message.split("]")[1].split(item)[1].trim();
        message = message.charAt(0).toUpperCase() + message.slice(1);
      }
      if (temp[index] === undefined) {
        temp[index] = {};
      }

      temp[index][item] = message;
    });
    return temp;
  };

  const onSubmit = (data) => {
    // if (rows1.length === 0) {
    //   setError("Please fill in the required fields");
    //   return;
    // }
    if (rows1.length > 10) {
      setError("You can only enter a maximum of 10 awards");
      return;
    }
    if (rows2.length > 10) {
      setError("You can only enter a maximum of 10 publications");
      return;
    }
    // if (rows2.length === 0) {
    //   setError("Please fill in the required fields");
    //   return;
    // }

    schema
      .validate({ awards: rows1 }, { abortEarly: false })
      .then((validData) => {
        setErrors1({});
      })
      .catch((err) => {
        setErrors1(assignErrors(err.inner));
      });
    schema
      .validate({ contrib: rows2 }, { abortEarly: false })
      .then((validData) => {
        setErrors2({});
      })
      .catch((err) => {
        setErrors2(assignErrors(err.inner));
      });
    if (
      Object.keys(errors1).length === 0 &&
      Object.keys(errors2).length === 0
    ) {
      let id = searchParams.get("id");
      let entry_id = 0;
      let data = [];
      rows1.forEach((row) => {
        data.push({
          id: id,
          name: row.name,
          year: row.year,
          type: "a",
          entry_id: entry_id++,
          description: row.desc,
        });
      });
      rows2.forEach((row) => {
        data.push({
          id: id,
          name: row.name,
          year: row.year,
          type: "c",
          entry_id: entry_id++,
          description: row.desc,
        });
      });
      let res = fetch("/api/saveAwards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableName: "award_achievements",
          data: data,
          id: id,
        }),
      });
      res
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            router.push("/apply/sec4?id=" + res.id);
          } else {
            setError("Error in saving data");
          }
        });
    }
  };

  useEffect(() => {
    fetch("/api/getSectionData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "award_achievements",
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isFilled) return;

        let awards = [];
        let contrib = [];
        res.data.forEach((row) => {
          if (row.type === "a") {
            awards.push({
              id: awards.length + 1,
              name: row.name,
              year: row.year,
              desc: row.description,
            });
          } else {
            contrib.push({
              id: contrib.length + 1,
              name: row.name,
              year: row.year,
              desc: row.description,
            });
          }
        });
        setRows1(awards);
        setRows2(contrib);
      });
  }, []);

  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);

  const addEntry = (rows, setRows) => {
    setRows([...rows, { id: rows.length + 1, name: "", year: "", desc: "" }]);
  };

  const header1 = [
    { field: "name", headerName: "Award Name", width: 130, type: "text" },
    { field: "year", headerName: "Year", width: 130, type: "number" },
    { field: "desc", headerName: "Description", width: 130, type: "text" },
  ];

  const header2 = [
    { field: "name", headerName: "Title/Paper name", width: 130, type: "text" },
    { field: "year", headerName: "Year", width: 130, type: "number" },
    {
      field: "desc",
      headerName: "Publication/Conference",
      width: 130,
      type: "text",
    },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <ThemeProvider theme={theme}>
      {errorMessage !== "" && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            zIndex: "1000",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "20vw",
              height: "20vh",
              top: "30vh",
              left: "40vw",
              backgroundColor: "#ffefb6",
              zIndex: "1000",
              textAlign: "center",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {errorMessage}
            <Button
              onClick={() => {
                setError("");
              }}
              className={styles.okButton}
            >
              Ok
            </Button>
          </Box>
        </Box>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#F3F3F3",
          borderRadius: " 20px 20px 0px 0px",
        }}
        className={styles.bgContainer}
      >
        <SectionHeader
          sectionNo={3}
          subText={"Awards and Achievements"}
          allReq={false}
        />
        <Box
          component="form"
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            padding: "2rem",
            marginBottom: "2rem",
            backgroundColor: "white",
            borderRadius: " 20px",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold" }}
              className={styles.inputLabel}
            >
              List down the awards or honors received for teaching excellence
              (Maximum 10) *
            </Typography>
            <DataTable
              rows={rows1}
              header={header1}
              setRows={setRows1}
              errors={errors1}
              showDelete={true}
            />
            <button
              type="button"
              className={styles.addButton}
              onClick={() => {
                addEntry(rows1, setRows1, header1);
              }}
            >
              <FontAwesomeIcon icon={faPlus} fontSize={"3vh"} color={"black"} />
            </button>
          </Box>

          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
            className={styles.inputLabel}
          >
            List any publications, research, or educational contribution
            (Maximum 10) *
          </Typography>
          <Box>
            <DataTable
              rows={rows2}
              header={header2}
              setRows={setRows2}
              errors={errors2}
              showDelete={true}
            />
            <button
              type="button"
              className={styles.addButton}
              onClick={() => {
                addEntry(rows2, setRows2, header2);
              }}
            >
              <FontAwesomeIcon icon={faPlus} fontSize={"3vh"} color={"black"} />
            </button>
          </Box>

          <p
            style={{
              float: "right",
              color: "red",
            }}
          >
            * marked fields are required
          </p>
        </Box>
        <div style={{ flexDirection: "row", width: "100%" }}>
          <Button
            type="button"
            variant="contained"
            sx={{
              m: 2,
              color: "white",
              borderRadius: "20px",
              boxShadow: "none",
            }}
          >
            <Link
              href={{
                pathname: "/apply/sec2",
                query: {
                  id: searchParams.get("id"),
                },
              }}
            >
              Previous
            </Link>
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{
              m: 2,
              color: "white",
              borderRadius: "20px",
              float: "right",
              boxShadow: "none",
            }}
          >
            Save & Next
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
