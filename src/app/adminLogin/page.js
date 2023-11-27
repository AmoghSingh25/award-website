"use client";

import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup
  .object()
  .shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is requried"),
  })
  .required();

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resp = await res.json();
      if (!resp.error) {
        if (resp.type === "a") {
          router.push("/admin/AddJury?id=" + resp.id);
        } else {
          router.push("/jury/juryHome?id=" + resp.id);
        }
      } else {
        setError(resp.message);
      }
    } catch (err) {
      setError("User does not exist, please signup");
    }
  };
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);
  const [errorMessage, setError] = React.useState("");

  return (
    <>
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
                color: "white",
              }}
            >
              {errorMessage}
              <Button
                onClick={() => {
                  if (errorMessage === "User does not exist, please signup") {
                    router.push("/signup");
                  }
                  setError("");
                }}
                sx={{
                  mt: 3,
                  backgroundColor: "#4b5ed7",
                  borderRadius: "20px",
                  boxShadow: "none",
                  alignSelf: "center",
                  mb: 3,
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#4b5ed7",
                    boxShadow: "none",
                  },
                }}
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
            alignItems: "center",
            mt: 10,
            backgroundColor: "#f5f5f5",
            mx: "20%",
            padding: "2%",
            borderRadius: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Jury/Admin Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "60%",
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Username *"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              className={styles.inputField}
            />
            <TextField
              label="Password *"
              variant="outlined"
              name="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              className={styles.inputField}
              sx={{
                width: "100%",
              }}
              type="password"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#313d8b",
                borderRadius: "20px",
                boxShadow: "none",
                alignSelf: "center",
                mb: 3,
              }}
            >
              Login
            </Button>

            <p>
              Applicant ? Click here to{" "}
              <a
                href="/login"
                style={{
                  textDecoration: "underline",
                  color: "#313d8b",
                }}
              >
                Login
              </a>
            </p>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
