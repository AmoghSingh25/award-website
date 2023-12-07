"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/previewDataTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import DataComponent from "./dataComponent";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [award, setAward] = useState(null);
  const [achievement, setAchievement] = useState(null);
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
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    fetch("/api/getApplicantData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: searchParams.get("applicantId"),
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        resp.case_study;
        data;
        setData(resp);
      })
      .catch((err) => {
        setError("Error fetching data");
      });
    fetch("/api/admin/getDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: searchParams.get("applicantId"),
        userID: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.error) {
          setError(resp.error);
        }
        if (resp.id_card) {
          setFile("id_card", resp.id_card.data, setId);
        }
        if (resp.awards) {
          setFile("award", resp.awards.data, setAward);
        }
        if (resp.other_documents) {
          setFile("achievement", resp.other_documents.data, setAchievement);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data");
      });
  }, []);

  const setFile = async (file_name, file_data, set_file) => {
    if (file_data !== null) {
      // const file = new File(
      //   [byteArray],
      //   file_name + "." + fileType.split("/")[1],
      //   {
      //     type: fileType,
      //     uploaded: true,
      //   }
      // );
      const fileType = await getFileSignature(file_data);
      const byteArray = new Uint8Array(file_data);
      if (
        fileType === "image/jpeg" ||
        fileType === "image/jpg" ||
        fileType === "image/png"
      ) {
        const b64 =
          "data:" +
          fileType +
          ";base64," +
          Buffer.from(byteArray).toString("base64");
        set_file({ data: b64, type: fileType });
      } else {
        set_file({ data: byteArray, type: fileType });
      }
    }
  };

  const openFile = async (file) => {
    const blob = new Blob([file.data], { type: file.type });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  async function getFileSignature(file) {
    const arr = new Uint8Array(file).subarray(0, 4);
    let header = "";
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    const file_type = header.toUpperCase();
    const file_type_dict = {
      "89504E47": "image/png",
      25504446: "application/pdf",
      FFD8FFDB: "image/jpeg",
      FFD8FFE0: "image/jpg",
    };
    return file_type_dict[file_type] || null;
  }

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
                  backgroundColor: "#313d8b",
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
                            sx={{
                              my: "2%",
                              fontWeight: "bold",
                              color: "white",
                            }}
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
                          color: "white",
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
              {id !== null && (
                <>
                  {id.type === "application/pdf" && (
                    <div
                      className={styles.tableDiv}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                      }}
                    >
                      <h2>ID Card</h2>
                      <Button
                        sx={{
                          height: "5%",
                          backgroundColor: "#373f6e",
                          color: "white",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          textTransform: "none",
                          mb: "2rem",
                        }}
                        onClick={() => {
                          openFile(id);
                        }}
                      >
                        View ID Card
                      </Button>
                    </div>
                  )}
                  {id.type !== "application/pdf" && (
                    <>
                      <div
                        className={styles.tableDiv}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "30%",
                        }}
                      ></div>
                      <h2>ID Card</h2>
                      <img
                        src={id.data}
                        style={{
                          width: "100%",
                          maxHeight: "30vh",
                          objectFit: "contain",
                        }}
                      ></img>
                    </>
                  )}
                </>
              )}
              {award !== null && (
                <>
                  {award.type === "application/pdf" && (
                    <div
                      className={styles.tableDiv}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                      }}
                    >
                      <h2>Awards</h2>
                      <Button
                        sx={{
                          height: "5%",
                          backgroundColor: "#373f6e",
                          color: "white",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          textTransform: "none",
                          mb: "2rem",
                        }}
                        onClick={() => {
                          openFile(award);
                        }}
                      >
                        View Awards
                      </Button>
                    </div>
                  )}
                  {award.type !== "application/pdf" && (
                    <>
                      <div
                        className={styles.tableDiv}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "30%",
                        }}
                      ></div>
                      <h2>Awards</h2>
                      <img
                        src={award.data}
                        style={{
                          width: "100%",
                          maxHeight: "30vh",
                          objectFit: "contain",
                        }}
                      ></img>
                    </>
                  )}
                </>
              )}
              {achievement !== null && (
                <>
                  {achievement.type === "application/pdf" && (
                    <div
                      className={styles.tableDiv}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                      }}
                    >
                      <h2>Other Documents</h2>
                      <Button
                        sx={{
                          height: "5%",
                          backgroundColor: "#373f6e",
                          color: "white",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          textTransform: "none",
                          mb: "2rem",
                        }}
                        onClick={() => {
                          openFile(achievement);
                        }}
                      >
                        View documents
                      </Button>
                    </div>
                  )}
                  {achievement.type !== "application/pdf" && (
                    <>
                      <div
                        className={styles.tableDiv}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "30%",
                        }}
                      ></div>
                      <h2>Other documents</h2>
                      <img
                        src={achievement.data}
                        style={{
                          width: "100%",
                          maxHeight: "30vh",
                          objectFit: "contain",
                        }}
                      ></img>
                    </>
                  )}
                </>
              )}
            </Box>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  width: "10%",
                  height: "5%",
                  backgroundColor: "#373f6e",
                  color: "white",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textTransform: "none",
                  mb: "2rem",
                }}
              >
                <Link
                  href={{
                    pathname: "/jury/juryHome",
                    query: {
                      id: searchParams.get("id"),
                    },
                  }}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  params={{ id: searchParams.get("id") }}
                >
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
