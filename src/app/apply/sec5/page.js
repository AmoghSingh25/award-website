"use client";

import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import SectionHeader from "../../../components/sectionHeader";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup.object().shape({
  idCard: yup.string().required(),
  awards: yup.string().required(),
  check1: yup
    .boolean()
    .required("Please check this box")
    .oneOf([true], "Please check this box"),
  check2: yup
    .boolean()
    .required("Please check this box")
    .oneOf([true], "Please check this box"),
});
export default function Page() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [idCard, setIdCard] = useState(null);
  const [awards, setawards] = useState(null);
  const [otherDocs, setOtherDocs] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

  async function convertToHexString(pdfFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target.result;
          const byteArray = new Uint8Array(arrayBuffer);
          const hexString =
            "\\x" +
            Array.from(byteArray, (byte) =>
              ("00" + byte.toString(16)).slice(-2)
            ).join("");
          resolve(hexString);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (event) => {
        reject("Error reading the file.");
      };

      reader.readAsArrayBuffer(pdfFile);
    });
  }

  const setFile = async (file_name, file_data, set_file) => {
    console.log("FILE TYPE = ", await getFileSignature(file_data));
    if (file_data !== null) {
      const fileType = getFileSignature(file_data);
      const byteArray = new Uint8Array(file_data.data);
      const file = new File(
        [byteArray],
        file_name + "." + fileType.split("/")[1],
        {
          type: fileType,
          uploaded: true,
        }
      );
      set_file(file);
    }
  };

  async function getFileSignature(file) {
    const arr = new Uint8Array(file.data).subarray(0, 4);
    let header = "";
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    const file_type = header.toUpperCase();
    console.log("FILE TYPE = ", file_type);
    const file_type_dict = {
      "89504E47": "image/png",
      25504446: "application/pdf",
      FFD8FFDB: "image/jpeg",
    };
    return file_type_dict[file_type] || null;
  }

  useEffect(() => {
    fetch("/api/getSectionData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "supporting_documents",
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isFilled) return;
        const data = res.data[0];
        console.log("DATA = ", data);
        setFile("idCard_" + searchParams.get("id"), data.id_card, setIdCard);
        setFile("awards_" + searchParams.get("id"), data.awards, setawards);
        setFile(
          "otherDocs_" + searchParams.get("id"),
          data.other_documents,
          setOtherDocs
        );
      });
  }, []);

  const checkErrors = () => {
    let flag = false;
    setErrors({
      check1: check1 ? null : "Please check this box",
      check2: check2 ? null : "Please check this box",
      idCard: idCard ? null : "Please upload ID Card",
    });
    if (!check1 || !check2 || idCard === null) {
      flag = true;
    }
    if (idCard !== null) {
      if (idCard.size > 2000000) {
        setErrors(
          (prev) => (prev = { ...prev, idCard: "File size too large" })
        );
        flag = true;
      }
      if (
        idCard.type !== "application/pdf" &&
        idCard.type !== "image/jpeg" &&
        idCard.type !== "image/png" &&
        idCard.type !== "image/jpg"
      ) {
        console.log("Error caught");

        setErrors(
          (prev) => (prev = { ...prev, idCard: "File type not supported" })
        );
        flag = true;
      }
    }

    if (awards !== null) {
      if (awards.size > 2000000) {
        setErrors(
          (prev) => (prev = { ...prev, awards: "File size too large" })
        );
        flag = true;

        if (
          awards.type !== "application/pdf" &&
          awards.type !== "image/jpeg" &&
          awards.type !== "image/png" &&
          awards.type !== "image/jpg"
        ) {
          setErrors(
            (prev) => (prev = { ...prev, awards: "File type not supported" })
          );
          flag = true;
        }
      }
    }

    if (otherDocs !== null) {
      if (otherDocs.size > 2000000) {
        setErrors(
          (prev) => (prev = { ...prev, collat: "File size too large" })
        );
        flag = true;
      }
      if (
        otherDocs.type !== "application/pdf" &&
        otherDocs.type !== "image/jpeg" &&
        otherDocs.type !== "image/png" &&
        otherDocs.type !== "image/jpg"
      ) {
        setErrors(
          (prev) => (prev = { ...prev, otherDocs: "File type not supported" })
        );
        flag = true;
      }
    }
    return flag;
  };

  const onSubmit = async () => {
    console.log("submit");
    setSubmitClicked(true);
    const flag = checkErrors();
    if (flag) {
      console.log("ERROR");
      console.log(flag, check1, check2, idCard, awards, otherDocs);
      return;
    }

    console.log("ERRORS= ", errors);

    let data = [];
    const id = searchParams.get("id");
    const id_hex = await convertToHexString(idCard);
    const awards_hex =
      awards !== null ? await convertToHexString(awards) : null;
    const otherDocs_hex =
      otherDocs !== null ? await convertToHexString(otherDocs) : null;
    data = {
      id: id,
      id_card: id_hex,
      awards: awards_hex,
      other_documents: otherDocs_hex,
    };
    fetch("/api/saveSection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableName: "supporting_documents",
        data: data,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (!resp.error) {
          router.push("/apply/sec6?id=" + resp.id);
        } else {
          setError("Error submitting");
        }
      })
      .catch((err) => {
        setError("Error submitting");
      });
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setError] = useState("");

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
          sectionNo={5}
          subText={"Uploading Documents"}
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
          <div className={styles.fileInfo}>
            <p>
              Please upload the following documents in PDF/JPG/JPEG/PNG format
              only. The file size should not exceed 2 MB.
            </p>
          </div>

          <div className={styles.bgDiv}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold" }}
              className={styles.inputLabel}
            >
              Your ID card from current institution *
            </Typography>
            <div className={styles.subSection}>
              <Input
                type="file"
                name="idCard"
                className={styles.inputButton}
                onChange={(e) => {
                  if (e.target.files[0] !== undefined) {
                    setIdCard(e.target.files[0]);
                  } else {
                    setIdCard(null);
                  }
                }}
              />
              {idCard !== null && (
                <p style={{ color: "green", marginBottom: "3%" }}>
                  Selected {idCard.name}
                </p>
              )}
              {errors.idCard && (
                <p style={{ color: "red", marginBottom: "3%" }}>
                  {errors.idCard}
                </p>
              )}
            </div>
          </div>

          <div className={styles.bgDiv}>
            <Typography
              variant="h6"
              component="h2"
              className={styles.inputLabel}
              sx={{
                fontWeight: "bold",
              }}
            >
              Supporting documents
            </Typography>

            <div className={styles.subSection}>
              <Typography variant="h6" component="h2">
                1. Awards and accolades received
              </Typography>
              <Input
                type="file"
                name="awards"
                className={styles.inputButton}
                onChange={(e) => {
                  if (e.target.files[0] !== undefined)
                    setawards(e.target.files[0]);
                  else {
                    setawards(null);
                  }
                }}
              />
              {awards !== null && (
                <p style={{ color: "green", marginBottom: "3%" }}>
                  Selected {awards.name}
                </p>
              )}
              {errors.awards && (
                <p style={{ color: "red", marginBottom: "3%" }}>
                  {errors.awards}
                </p>
              )}
            </div>
            <div className={styles.subSection}>
              <Typography variant="h6" component="h2">
                2.Other collaterals to support your entry (Audio or Video in MP3
                or MP4 format or relevant links (YouTube), Gdrive documents,
                PPTs, etc.)
              </Typography>
              <Input
                type="file"
                name="otherDocs"
                className={styles.inputButton}
                onChange={(e) => {
                  if (e.target.files[0] !== undefined)
                    setOtherDocs(e.target.files[0]);
                  else {
                    setOtherDocs(null);
                  }
                }}
              />
              {otherDocs !== null && (
                <p style={{ color: "green", marginBottom: "3%" }}>
                  Selected {otherDocs.name}
                </p>
              )}
              {errors.collat && (
                <p style={{ color: "red", marginBottom: "3%" }}>
                  {errors.collat}
                </p>
              )}
              <br />
            </div>
          </div>
          <div className={styles.checkDiv}>
            <Checkbox
              name="check1"
              checked={check1}
              value={check1}
              onChange={(e) => {
                setCheck1(e.target.checked);
              }}
              style={{
                color: "#00DB16",
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="body1" component="h2" sx={{ mt: "1%" }}>
              I agree to submit a letter from the institution stating my tenure
              of full-time employment as on September 30, 2023 and the Grade in
              which I am currently a full-time teaching faculty, if shortlisted
              *
            </Typography>
          </div>
          {errors.check1 && (
            <p style={{ color: "red", marginBottom: "3%" }}>{errors.check1}</p>
          )}
          <div className={styles.checkDiv}>
            <Checkbox
              checked={check2}
              value={check2}
              onChange={(e) => {
                setCheck2(e.target.checked);
              }}
              style={{
                color: "#00DB16",
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="body1" component="h2" sx={{ mt: "1%" }}>
              I agree to submit a declaration stating my total teaching
              experience as on September 30, 2023 *
            </Typography>
          </div>
          {errors.check2 && (
            <p style={{ color: "red", marginBottom: "3%" }}>{errors.check2}</p>
          )}

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
                pathname: "/apply/sec4",
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
            onClick={() => {
              onSubmit();
            }}
            sx={{
              m: 2,
              color: "white",
              borderRadius: "20px",
              float: "right",
              boxShadow: "none",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
