"use client";

import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    name: yup.string().required("Name is required"),
    check1: yup.bool().oneOf([true], "Please check this box").required(),
  })
  .required();

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (!checked) {
      setError("Please check the box");
      return;
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resp = await res.json();
    if (!resp.error) {
      data.id = resp.id;
      data.section = resp.last_saved;
      router.push("/apply/sec" + resp.last_saved + "?id=" + resp.id);
    }
    if (resp.error && resp.status === "Already submitted") {
      setError("Application already submitted");
      return;
    } else if (resp.error) {
      if (resp.status === "User already exists") {
        setError(
          "An account with this email/phone already exists. \n Please login"
        );
        return;
      }
      setError("Error logging in");
      return;
    }
  };
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);
  const [checked, setChecked] = React.useState(false);
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
                if (
                  errorMessage ===
                  "An account with this email/phone already exists. \n Please login"
                ) {
                  router.replace("/login");
                }
                setError("");
              }}
              className={styles.okButton}
            >
              Ok
            </Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          mx: "auto",
          mt: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: "20px",
          width: "50vw",
          padding: "20px",
        }}
        className={styles.loginBox}
      >
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            label="Name *"
            variant="outlined"
            name="name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            className={styles.inputField}
            sx={{
              width: "100%",
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email *"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            className={styles.inputField}
          />
          <TextField
            label="Phone *"
            variant="outlined"
            name="phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            className={styles.phoneInput}
            sx={{
              width: "100%",
            }}
            type="number"
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "controlled" }}
              value={checked}
              onChange={(e) => {
                if (e.target.checked) {
                  setChecked(true);
                } else {
                  setChecked(false);
                }
                setValue("check1", e.target.checked);
              }}
            />
            <Typography
              variant="body1"
              component="h4"
              sx={{
                width: "80%",
                mt: "1%",
              }}
            >
              I agree to the{" "}
              <a
                href="/terms"
                style={{
                  textDecoration: "underline",
                  color: "#F5C005",
                }}
              >
                Terms and Conditions
              </a>
            </Typography>

            {errors.check1 && (
              <p className={styles.errorMessage}>Please check this box</p>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#F5C005",
              borderRadius: "20px",
              boxShadow: "none",
              alignSelf: "center",
            }}
          >
            Signup
          </Button>
          <p>
            Click here to{" "}
            <a
              href="/login"
              style={{
                textDecoration: "underline",
                color: "#F5C005",
              }}
            >
              Login
            </a>
          </p>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
