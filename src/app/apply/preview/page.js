"use client";

import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DataTable from "@/components/previewDataTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SectionHeader from "../../../components/sectionHeader";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import DataComponent from "./dataComponent";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup.object().shape({
  teaching_exp: yup
    .number()
    .typeError("Years must be a number")
    .required("Enter a number")
    .min(0)
    .max(100)
    .nonNullable("Enter a number"),
  institute_exp: yup
    .number()
    .typeError("Years must be a number")
    .required("Enter a number")
    .min(0)
    .max(100)
    .nonNullable("Enter a number"),
  subjects: yup
    .array()
    .of(yup.string().required("Subject is required"))
    .min(1)
    .nonNullable()
    .required("Subject is required"),
  grade: yup
    .string()
    .required("Grade level(s) taught is required")
    .min(1)
    .nonNullable(),
  professional_membership: yup
    .array()
    .of(yup.string().required("Fill in the field"))
    .nullable(),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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

  const [errorMessage, setError] = useState("");

  const submitApplication = () => {
    fetch("/api/saveApplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          router.push("/application_success");
        } else {
          setError("Error saving application");
        }
      })
      .catch((err) => {
        err;
        setError("Error submitting application");
      });
  };

  useEffect(() => {
    fetch("/api/getApplicantData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        resp.case_study;
        data;
        setData(resp);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
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
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  mb: "2rem",
                }}
              >
                Preview
              </Typography>
              <DataComponent
                data={[
                  { header: "Name of Candidate", data: data.name },
                  {
                    header: "Name of institution",
                    data: data.institute,
                  },
                  {
                    header: "City/Town",
                    data: data.city,
                  },
                  {
                    header: "District",
                    data: data.district,
                  },
                  {
                    header: "State",
                    data: data.state,
                  },
                  {
                    header: "Mobile Number",
                    data: data.phone,
                  },
                  {
                    header: "Email ID",
                    data: data.email,
                  },
                  {
                    header: "Total years of teaching experience",
                    data: data.teaching_exp,
                  },
                  {
                    header:
                      "Years of teaching experience in current institution",
                    data: data.institute_exp,
                  },
                  {
                    header: "Grade level(s) taught",
                    data: data.grade,
                  },
                  {
                    header: "Professional Membership",
                    data: data.professional_membership,
                  },
                ]}
              />
              <div
                style={{
                  width: "30%",
                }}
              >
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    mb: "1%",
                    fontWeight: "bold",
                    mt: "2vh",
                  }}
                  className={styles.inputLabel}
                >
                  Subjects taught
                </Typography>
                <div className={styles.subjectsDiv}>
                  <ol
                    style={{
                      paddingLeft: "10%",
                      margin: "0 0 0 10px",
                    }}
                  >
                    {data.subjects.map((item, index) => {
                      return (
                        <li className={styles.subjectText} key={index}>
                          <Typography
                            variant="body1"
                            component="h2"
                            sx={{ my: "2%", fontWeight: "bold" }}
                          >
                            {item}
                          </Typography>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className={styles.questionDiv}>
                {data.case_study.map((item) => {
                  return (
                    <>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold" }}
                        className={styles.inputLabel}
                      >
                        {item.question}
                      </Typography>
                      <Typography
                        className={styles.answerBox}
                        sx={{
                          height: "10%",
                          margin: "2%",
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </>
                  );
                })}
              </div>
              <div className={styles.tableDiv}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                  className={styles.inputLabel}
                >
                  Awards
                </Typography>
                <DataTable rows={data.awards} header={header1} errors={[]} />
              </div>

              <div className={styles.tableDiv}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                  className={styles.inputLabel}
                >
                  Publication, research or educational contribution
                </Typography>
                <DataTable
                  rows={data.achievements}
                  header={header2}
                  errors={[]}
                  showDelete={false}
                />
              </div>
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
                onClick={() => {
                  data;
                }}
              >
                {/* <Link
                  href={{
                    pathname: "/apply/sec1",
                    query: {
                      id: searchParams.get("id"),
                    },
                  }}
                > */}
                Previous
                {/* </Link> */}
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => submitApplication()}
                sx={{
                  m: 2,
                  color: "white",
                  borderRadius: "20px",
                  float: "right",
                  boxShadow: "none",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
