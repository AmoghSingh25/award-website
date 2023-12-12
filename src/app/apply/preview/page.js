"use client";

import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DataTable from "@/components/previewDataTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import DataComponent from "./dataComponent";
import Link from "next/link";

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
  const [confirmation, setConfirmation] = useState("");

  const onSubmit = () => {
    setConfirmation(
      "Are you sure you want to submit the application? \n Once submitted, the form cannot be edited"
    );
  };

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
          fetch("/api/logger", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              error: res.message,
              id: id,
              location: "preview",
            }),
          });
          setError("Error saving application");
        }
      })
      .catch((err) => {
        fetch("/api/logger", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: err.message,
            id: id,
            location: "preview",
          }),
        });
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
          {confirmation !== "" && (
            <Box
              sx={{
                position: "absolute",
                width: "200vw",
                minHeight: "100vh",
                height: "170vh",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: "1000",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "20vw",
                  height: "20vh",
                  top: "130vh",
                  left: "40vw",
                  backgroundColor: "#ffefb6",
                  zIndex: "1000",
                  textAlign: "center",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {confirmation}
                <Button
                  onClick={() => {
                    setConfirmation("");
                  }}
                  className={styles.okButton}
                  sx={{
                    backgroundColor: "#313d8b",
                    color: "White",
                    marginTop: "1rem",
                    ":hover": {
                      backgroundColor: "#313d8b",
                    },
                  }}
                >
                  Go back
                </Button>
                <Button
                  onClick={() => {
                    submitApplication();
                  }}
                  className={styles.okButton}
                  sx={{
                    backgroundColor: "#313d8b",
                    color: "White",
                    marginTop: "1rem",
                    ":hover": {
                      backgroundColor: "#313d8b",
                    },
                  }}
                >
                  Confirm
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
              <p
                style={{
                  width: "12%",
                  // textAlign: "center",
                  margin: "0 0 0 10px",
                  color: "red",
                }}
              >
                If any field needs to be edited, press the previous button
              </p>
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
                    pathname: "/apply/sec6",
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
                onClick={() => onSubmit()}
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
