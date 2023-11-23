"use client";

import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useController } from "react-hook-form";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StateSelect from "../../../components/stateSelect";
import styles from "./page.module.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SectionHeader from "../../../components/sectionHeader";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const options = [
  {
    value: "Andaman and Nicobar Islands",
    label: "Andaman and Nicobar Islands",
  },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Puducherry", label: "Puducherry" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
];

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3, "Must be at least 3 characters")
    .matches(/^[a-zA-Z ]+$/, "Must be only alphabets"),
  state: yup.mixed().required("State is required"),
  city: yup.string().required("City is required"),
  district: yup.string().required("District is required"),
  institute: yup.string().required("Institution is required"),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.id = searchParams.get("id");
    const res = fetch("/api/saveSection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "personal_details",
        data: data,
        id: data.id,
      }),
    });
    res
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          router.push("/apply/sec2?id=" + res.id);
        } else {
          setError("Error in saving data");
        }
      });
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    field: { value: stateValue, onChange: onStateChange, ...stateField },
  } = useController({ name: "state", control });

  useEffect(() => {
    fetch("/api/getSectionData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "personal_details",
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isFilled) return;
        res = res.data[0];
        delete res.id;
        setValue("name", res.name);
        setValue("city", res.city);
        setValue("district", res.district);
        setValue("institute", res.institute);
        setValue("state", res.state);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
          sectionNo={1}
          subText={"Personal Details"}
          allReq={true}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                Name of the teacher *
              </Typography>
              <TextField
                variant="outlined"
                name="name"
                {...register("name")}
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                inputProps={{
                  disableUnderline: true,
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
                className={styles.inputField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                Name of institution *
              </Typography>
              <TextField
                variant="outlined"
                name="institute"
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                {...register("institute")}
                error={!!errors.institute}
                helperText={errors.institute?.message}
                className={styles.inputField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                City/Town *
              </Typography>
              <TextField
                variant="outlined"
                name="city"
                {...register("city")}
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                error={!!errors.city}
                helperText={errors.city?.message}
                className={styles.inputField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                District *
              </Typography>
              <TextField
                variant="outlined"
                name="district"
                {...register("district")}
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                error={!!errors.district}
                helperText={errors.district?.message}
                className={styles.inputField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                State *
              </Typography>
              <Select
                menuPlacement="top"
                menuPosition="absolute"
                options={options}
                value={
                  stateValue
                    ? options.find((x) => x.value === stateValue)
                    : stateValue
                }
                onChange={(option) => {
                  onStateChange(option ? option.value : option);
                }}
                name="state"
                placeholder="Select a state *"
                styles={{
                  menu: (base) => ({
                    ...base,
                    width: "70%",
                    borderRadius: "20px",
                    zIndex: 100,
                    backgroundColor: "#F7F7F7",
                  }),
                  control: (base) => ({
                    ...base,
                    width: "70%",
                    zIndex: 100,
                    height: 50,
                    borderRadius: "20px",
                    border: "0.5px solid #707070",

                    backgroundColor: "#F7F7F7",
                  }),
                  option: (base) => ({
                    ...base,
                    width: "70%",
                    color: "black",
                    zIndex: 100,
                    backgroundColor: "#F7F7F7",
                  }),
                }}
                {...stateField}
              />
              {errors.state && (
                <p
                  style={{
                    color: "red",
                    fontSize: 12,
                  }}
                >
                  {errors.state.message}
                </p>
              )}
            </Grid>
          </Grid>
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
            className={styles.submitButton}
            onClick={() => {
              handleSubmit(onSubmit)();
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
    </ThemeProvider>
  );
}
