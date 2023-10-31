"use client";

import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import Checkbox from "@mui/material/Checkbox";
import SectionHeader from "../../../components/sectionHeader";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { ThemeProvider } from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup.object().shape({
  check1: yup
    .boolean()
    .required("Please check this box")
    .oneOf([true], "Please check this box"),
  check2: yup
    .boolean()
    .required("Please check this box")
    .oneOf([true], "Please check this box"),
  check3: yup
    .boolean()
    .required("Please check this box")
    .oneOf([true], "Please check this box"),
});
export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [institute, setInstitute] = useState("");

  const onSubmit = (data) => {
    router.push("/apply/preview?id=" + searchParams.get("id"));
  };

  useEffect(() => {
    fetch("/api/getApplication", {
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
        if (res.error) {
          setError("Error fetching application");
        } else {
          if (res.data) {
            setInstitute(res.data.institute);
          }
        }
      })
      .catch((err) => {
        setError("Error fetching application");
      });
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setError] = React.useState("");

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
        <SectionHeader sectionNo={6} subText={"Declaration"} allReq={true} />

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
          <div className={styles.checkDiv}>
            <Controller
              name="check1"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            />
            <Typography
              variant="body1"
              component="h2"
              className={styles.inputLabel}
              sx={{ mt: "0.5%" }}
            >
              I/we hereby declare that the details furnished in the application
              form and supporting documents submitted for Teachers Excellence
              Awards 2023, are to the best of my knowledge and belief true,
              correct and complete. In case any of the said information is found
              to be false or untrue or misleading or misrepresenting, I am/we
              are aware that I/we will be held liable for it. *
            </Typography>
          </div>
          {errors.check1 && (
            <p className={styles.errorMessage}>Please check this box</p>
          )}
          <div className={styles.checkDiv}>
            <Controller
              name="check2"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            />
            <Typography
              variant="body1"
              component="h2"
              className={styles.inputLabel}
              sx={{ mt: "0.5%" }}
            >
              I declare that below is information mentioned true with respect to
              my application for the Awards: <br />
              1. I have minimum of 5 years of experience as a teacher as on
              September 30, 2023 <br />
              2. I am currently a full-time teaching faculty in an affiliated
              educational institution in Tamil Nadu as on September 30, 2023{" "}
              <br />
              3. The details mentioned in this application form pertains to the
              work done by me as a teacher within the period of October 01, 2021
              to September 30, 2023 *
            </Typography>
          </div>
          {errors.check2 && (
            <p className={styles.errorMessage}>Please check this box</p>
          )}
          <div className={styles.checkDiv}>
            <Controller
              name="check3"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            />
            <Typography
              variant="body1"
              component="h2"
              sx={{ mt: "0.5%" }}
              className={styles.inputLabel}
            >
              I/we, on behalf of my/our organization, {institute} , authorise
              the Awards Management to use the content submitted as part of
              my/our nomination, in whole or in part and use and display such
              entry, which shall include trade publications, press releases,
              electronic posting to the awards website, electronic hyperlinks to
              the website of the participant, and any display format selected by
              the Awards Management during the awards ceremony or at a later
              point in time, for a period of five years. *
            </Typography>
          </div>
          {errors.check3 && (
            <p className={styles.errorMessage}>Please check this box</p>
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
                pathname: "/apply/sec5",
                query: {
                  id: searchParams.get("id"),
                },
              }}
            >
              Previous
            </Link>
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            className={styles.submitButton}
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
  );
}
