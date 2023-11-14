"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import "./page.module.css";
import SectionHeader from "../../../components/sectionHeader";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const onSubmit = () => {
    let data = [];
    const id = searchParams.get("id");
    let q_id = 0;
    data.push({
      id: id,
      entry_id: q_id++,
      question:
        "Describe your teaching philosophy and approach to education. How do you inspire and engage students? *",
      answer: words1,
    });
    data.push({
      id: id,
      entry_id: q_id++,
      question:
        "Elaborate on the significant work done by you as a teacher in the past one year. Highlight the key challenges faced and how did you overcome them. *",
      answer: words2,
    });
    data.push({
      id: id,
      entry_id: q_id++,
      question:
        "Highlight the key factors that differentiate you from your peers as a teacher. *",
      answer: words3,
    });
    const res = fetch("/api/saveAwards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName: "case_study", data: data, id: id }),
    });
    res
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          router.push("/apply/sec5?id=" + res.id);
        } else {
          setError("Error in saving data");
        }
      });
  };

  useEffect(() => {
    fetch("/api/getSectionData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "case_study",
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isFilled) return;

        const data = res.data;
        setWords1(data[0].answer);
        setWords2(data[1].answer);
        setWords3(data[2].answer);
      });
  }, []);

  const [words1, setWords1] = useState("");
  const [words2, setWords2] = useState("");
  const [words3, setWords3] = useState("");
  const [errorMessage, setError] = useState("");

  const checkWords = (e) => {
    let words = e.split(/\b/);
    let onlyWords = words.filter((word) => /\w+/.test(word));
    return onlyWords.length;
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
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
      <SectionHeader sectionNo={4} subText={"Case Study"} allReq={true} />

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
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold" }}
          className={styles.inputLabel}
        >
          Describe your teaching philosophy and approach to education. How do
          you inspire and engage students? *
        </Typography>
        <TextareaAutosize
          className={styles.inputField}
          minRows={3}
          maxRows={10}
          value={words1}
          onChange={(e) => {
            setWords1(e.target.value);
          }}
        />
        <p
          style={{
            color: checkWords(words1) > 200 ? "red" : "black",
            marginBottom: "3%",
          }}
        >
          <span>{checkWords(words1)}</span>/200 words <br />
          {words1 > 200 ? "Word Limit exceeded" : ""}
        </p>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold" }}
          className={styles.inputLabel}
        >
          Elaborate on the significant work done by you as a teacher in the past
          one year. Highlight the key challenges faced and how did you overcome
          them. *
        </Typography>
        <TextareaAutosize
          className={styles.inputField}
          minRows={3}
          maxRows={10}
          value={words2}
          onChange={(e) => {
            setWords2(e.target.value);
          }}
        />
        <p
          style={{
            color: checkWords(words2) > 200 ? "red" : "black",
            marginBottom: "3%",
          }}
        >
          <span>{checkWords(words2)}</span>/200 words <br />
          {words2 > 200 ? "Word Limit exceeded" : ""}
        </p>

        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold" }}
          className={styles.inputLabel}
        >
          Highlight the key factors that differentiate you from your peers as a
          teacher. *
        </Typography>
        <TextareaAutosize
          className={styles.inputField}
          minRows={3}
          maxRows={10}
          value={words3}
          onChange={(e) => {
            setWords3(e.target.value);
          }}
        ></TextareaAutosize>
        <p
          style={{
            color: checkWords(words3) > 200 ? "red" : "black",
            marginBottom: "3%",
          }}
        >
          <span>{checkWords(words3)}</span>/200 words <br />
          {words3 > 200 ? "Word Limit exceeded" : ""}
        </p>

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
              pathname: "/apply/sec3",
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
            if (
              checkWords(words1) <= 200 &&
              checkWords(words2) <= 200 &&
              checkWords(words3) <= 200
            ) {
              onSubmit();
            }
          }}
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
  );
}
