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

const schema = yup
  .object()
  .shape({
    otp: yup.string().required("OTP is required"),
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

  const searchParams = useSearchParams();

  const onSubmit = async (data) => {
    data.email = searchParams.get("email");
    data.phone = searchParams.get("phone");
    data.name = searchParams.get("name");
    fetch("/api/verifyOTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          router.push("/apply/sec1" + "?id=" + res.id);
        } else {
          setError("Invalid OTP");
        }
      })
      .catch((err) => {
        setError(res.error);
      });
  };
  const [error, setError] = React.useState("");
  const router = useRouter();

  return (
    <Box className={styles.mainBox}>
      <Box>
        <Typography variant="h4" className={styles.header}>
          Enter OTP sent to email
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
          <TextField
            {...register("otp")}
            label="OTP"
            variant="outlined"
            error={!!errors.otp}
            helperText={errors.otp?.message}
            className={styles.textField}
            type="number"
            InputProps={{
              type: "number",
              sx: {
                "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                  {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              backgroundColor: "#1e3c72",
            }}
          >
            Submit
          </Button>
        </form>
        <Typography variant="body1">{error}</Typography>
      </Box>
    </Box>
  );
}
