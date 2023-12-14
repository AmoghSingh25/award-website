"use client";

import React, { useState, useEffect } from "react";
import TopBar from "../../../components/topBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Select from "react-select";
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
import { ConnectingAirportsOutlined } from "@mui/icons-material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const schema = yup.object().shape({
  teaching_exp: yup.object().shape({
    value: yup.string().required().nonNullable("Select an option"),
    label: yup
      .string()
      .required("Select an option")
      .nonNullable("Select an option"),
  }),
  institute_exp: yup
    .number()
    .typeError("Years must be a number")
    .required("Enter a number")
    .min(0)
    .max(100)
    .nonNullable("Enter a number"),
  subjects: yup
    .object()
    .shape({
      value: yup.string().required().nonNullable("Select a subject"),
      label: yup
        .string()
        .required("Select an option")
        .nonNullable("Select a subject"),
    })
    .nonNullable("Select a subject"),
  // subjects: yup
  //   .array()
  //   .of(yup.string().required("Subject is required"))
  //   .min(1)
  //   .max(5)
  //   .nonNullable()
  //   .required("Subject is required"),
  grade: yup.object().shape({
    value: yup.number().required().nonNullable("Select an option"),
    label: yup
      .string()
      .required("Select an option")
      .nonNullable("Select an option"),
  }),
  // .string()
  // .required("Grade level(s) taught is required")
  // .min(1)
  // .nonNullable(),
  professional_membership: yup.string().nullable(),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    data.teaching_exp = data.teaching_exp.value;
    data.grade = data.grade.value;
    data.subjects = [data.subjects.value];
    data.id = searchParams.get("id");
    const res = fetch("/api/saveSection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName: "experience_details", data: data }),
    });
    res
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          router.push("/apply/sec3?id=" + res.id);
        } else {
          setError("Error in saving data");
        }
      });
  };
  const selectedValue = watch("grade");
  const [, updateState] = React.useState();

  useEffect(() => {
    if (getValues("subjects") === undefined) return;
    const subject_temp = getValues("subjects").value;
    const temp_10 = subjects10.map((subject) => subject.value);
    const temp_12 = subjects12.map((subject) => subject.value);
    if (loading) return;
    if (
      (selectedValue.value === "10" && temp_10.includes(subject_temp)) ||
      (selectedValue.value === "12" && temp_12.includes(subject_temp))
    ) {
      return;
    } else {
      setValue("subjects", null);
      updateState({});
    }
  }, [selectedValue]);

  useEffect(() => {
    fetch("/api/getSectionData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "experience_details",
        id: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isFilled) {
          setLoading(false);
          return;
        }
        res = res.data[0];
        setValue("teaching_exp", {
          value: res.teaching_exp,
          label: res.teaching_exp,
        });
        setValue("institute_exp", res.institute_exp);
        setValue("grade", {
          value: res.grade,
          label: "Grade " + res.grade,
        });
        setValue("subjects", {
          value: res.subjects[0],
          label: res.subjects[0],
        });
        setValue("professional_membership", res.professional_membership);
        if (res.professional_membership) {
          setprofessional_membership(res.professional_membership);
        }
        setLoading(false);
      });
  }, []);

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [professional_membership, setprofessional_membership] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setError] = useState("");
  const experienceOptions = [
    { value: "5-15 Years", label: "5-15 years" },
    { value: "15-25 Years", label: "15-25 years" },
    { value: "More than 25 Years", label: "More than 25 years" },
  ];

  const grades = [
    { value: 10, label: "Grade 10" },
    { value: 12, label: "Grade 12" },
  ];

  const subjects10 = [
    //English
    // Regional
    // Mathematics
    // Science
    // Social studies (History, Geography, Civics, and Economics)
    { value: "English", label: "English" },
    { value: "Regional", label: "Regional" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    {
      value: "Social studies (History, Geography, Civics, and Economics)",
      label: "Social studies (History, Geography, Civics, and Economics)",
    },
  ];
  const subjects12 = [
    // Mathematics
    // Physics
    // Chemistry
    // Biology
    // Computer Science
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "Computer Science", label: "Computer Science" },
  ];

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
          sectionNo={2}
          subText={"Teaching Experience"}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                Total years of teaching experience *
              </Typography>
              {/* <TextField
                id="outlined-number"
                type="number"
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                {...register("teaching_exp")}
                error={!!errors.teaching_exp}
                helperText={errors.teaching_exp?.message}
                className={styles.inputField}
              />
              */}
              <Controller
                control={control}
                name="teaching_exp"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    options={experienceOptions}
                    onChange={onChange}
                    isMulti={false}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "20px",
                        border: "0.5px solid #707070",
                        boxShadow: "none",
                        width: "70%",
                        height: "100%",
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: 0,
                        marginTop: 0,
                        width: "70%",
                        borderRadius: "20px",
                        padding: "1%",
                      }),
                      option: (
                        styles,
                        { data, isDisabled, isFocused, isSelected }
                      ) => {
                        return {
                          ...styles,
                          borderRadius: "20px",
                          backgroundColor: isDisabled
                            ? undefined
                            : isSelected
                            ? "blue"
                            : isFocused
                            ? "#ffefb6"
                            : undefined,
                          color: isDisabled
                            ? "#ccc"
                            : isSelected
                            ? "white"
                              ? "white"
                              : "black"
                            : "black",

                          ":active": {
                            ...styles[":active"],
                            backgroundColor: !isDisabled
                              ? isSelected
                                ? "yellow"
                                : "blue"
                              : undefined,
                            color: isSelected ? "black" : "white",
                          },
                        };
                      },
                    }}
                  />
                )}
              />
              {errors.teaching_exp &&
                errors.teaching_exp.label &&
                errors.teaching_exp.label.message && (
                  <p style={{ color: "red" }}>
                    {errors.teaching_exp.label.message}
                  </p>
                )}
            </Grid>
            {/* <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                Subject(s) Taught *
              </Typography>
              <div className={styles.listDiv}>
                {subjects.map((subject, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        name={`subjects[${index}]`}
                        sx={{
                          width: "70%",
                          borderRadius: "20px",
                          border: "0.5px solid #707070",
                          "& fieldset": { border: "none" },
                          margin: 0,
                          padding: 0,
                          my: "1%",
                        }}
                        {...register(`subjects[${index}]`)}
                        error={!!errors.subjects?.[index]}
                        helperText={errors.subjects?.[index]?.message}
                        className={styles.inputField}
                        onChange={(e) => {
                          setSubjects(() => {
                            let newSubjects = [...subjects];
                            newSubjects[index] = e.target.value;
                            setValue("subjects", newSubjects);
                            return newSubjects;
                          });
                        }}
                      />
                      <Button
                        variant="outline"
                        className={styles.removeButton}
                        sx={{
                          backgroundColor: "#EB4F5A",
                          borderRadius: "20px",
                          color: "white",
                          opacity: "1",
                          ":hover": {
                            backgroundColor: "#EB4F5A",
                          },
                        }}
                        onClick={() => {
                          setSubjects(() => {
                            let newSubjects = [...subjects];
                            newSubjects.splice(index, 1);
                            setValue("subjects", newSubjects);
                            return newSubjects;
                          });
                        }}
                      >
                        <DeleteIcon color="red" />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <Button
                variant="contained"
                className={styles.addButton}
                sx={{
                  backgroundColor: "#F5C005",
                  borderRadius: "20px",
                  shadow: "none",
                  boxShadow: "none",
                  float: "right",
                  width: "5vh",
                  height: "5vh",
                  marginBottom: "2%",
                }}
                onClick={() => {
                  setSubjects((prev) => {
                    return [...prev, ""];
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  fontSize={"3vh"}
                  color={"black"}
                />
              </Button>
              {subjects.length === 0 && (
                <p style={{ color: "red" }}>Please add at least one subject</p>
              )}
              {subjects.length > 5 && (
                <p style={{ color: "red" }}>Maximum five subjects allowed</p>
              )} */}
            {/* </Grid> */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                Years of experience in current institution *
              </Typography>
              <TextField
                id="outlined-number"
                type="number"
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                {...register("institute_exp")}
                error={!!errors.institute_exp}
                helperText={errors.institute_exp?.message}
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
                Grade Level(s) taught *
              </Typography>
              {/* <TextField
                variant="outlined"
                name="grade"
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                {...register("grade")}
                error={!!errors.grade}
                helperText={errors.grade?.message}
                className={styles.inputField}
              /> */}
              <Controller
                control={control}
                name="grade"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    options={grades}
                    onChange={onChange}
                    isMulti={false}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "20px",
                        border: "0.5px solid #707070",
                        boxShadow: "none",
                        width: "70%",
                        height: "100%",
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: 0,
                        marginTop: 0,
                        width: "70%",
                        borderRadius: "20px",
                        padding: "1%",
                      }),
                      option: (
                        styles,
                        { data, isDisabled, isFocused, isSelected }
                      ) => {
                        return {
                          ...styles,
                          borderRadius: "20px",
                          backgroundColor: isDisabled
                            ? undefined
                            : isSelected
                            ? "blue"
                            : isFocused
                            ? "#ffefb6"
                            : undefined,
                          color: isDisabled
                            ? "#ccc"
                            : isSelected
                            ? "white"
                              ? "white"
                              : "black"
                            : "black",

                          ":active": {
                            ...styles[":active"],
                            backgroundColor: !isDisabled
                              ? isSelected
                                ? "yellow"
                                : "blue"
                              : undefined,
                            color: isSelected ? "black" : "white",
                          },
                        };
                      },
                    }}
                  />
                )}
              />
              {errors.grade && (
                <p style={{ color: "red" }}>{errors.grade.label.message}</p>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                className={styles.inputLabel}
                sx={{ mb: "1%", fontWeight: "bold" }}
              >
                Professional membership (if any)
              </Typography>
              <TextField
                variant="outlined"
                name="grade"
                sx={{
                  width: "70%",
                  mb: "3%",
                  borderRadius: "20px",
                  border: "0.5px solid #707070",
                  "& fieldset": { border: "none" },
                }}
                {...register("professional_membership")}
                error={!!errors.professional_membership}
                helperText={errors.professional_membership?.message}
                className={styles.inputField}
              />
            </Grid>
            {/* <div className={styles.listDiv}>
                {professional_membership.map((member, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        name={`professional_membership[${index}]`}
                        sx={{
                          width: "70%",
                          borderRadius: "20px",
                          border: "0.5px solid #707070",
                          "& fieldset": { border: "none" },
                          margin: 0,
                          padding: 0,
                        }}
                        {...register(`professional_membership[${index}]`)}
                        error={!!errors.professional_membership?.[index]}
                        helperText={
                          errors.professional_membership?.[index]?.message
                        }
                        className={styles.inputField}
                      />
                      <Button
                        variant="outline"
                        className={styles.removeButton}
                        sx={{
                          backgroundColor: "#EB4F5A",
                          borderRadius: "20px",
                          color: "white",
                          opacity: "1",
                          height: "40%",
                          ":hover": {
                            backgroundColor: "#EB4F5A",
                          },
                        }}
                        onClick={() => {
                          setprofessional_membership((prev) => {
                            let temp = [...prev];
                            temp.splice(index, 1);
                            setValue("professional_membership", temp);
                            return temp;
                          });
                        }}
                      >
                        <DeleteIcon color="red" />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <Button
                variant="contained"
                className={styles.addButton}
                sx={{
                  backgroundColor: "#F5C005",
                  borderRadius: "20px",
                  shadow: "none",
                  boxShadow: "none",
                  float: "right",
                  width: "5%",
                  height: "20%",
                  marginBottom: "2%",
                }}
                onClick={() => {
                  setprofessional_membership((prev) => {
                    return [...prev, ""];
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  fontSize={"3vh"}
                  color={"black"}
                />
              </Button>
            </Grid> */}
            {getValues("grade") && getValues("grade").value && (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  // backgroundColor: "#ffefb6",
                  borderRadius: "20px",
                  marginBottom: "2%",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  className={styles.inputLabel}
                  sx={{ mb: "1%", fontWeight: "bold" }}
                >
                  Subject taught *
                </Typography>
                <Controller
                  control={control}
                  name="subjects"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={
                        getValues("grade").value === 10
                          ? subjects10
                          : subjects12
                      }
                      menuPlacement="top"
                      onChange={onChange}
                      isMulti={false}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderRadius: "20px",
                          border: "0.5px solid #707070",
                          boxShadow: "none",
                          width: "70%",
                          height: "100%",
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: 0,
                          marginTop: 0,
                          width: "70%",
                          borderRadius: "20px",
                          padding: "1%",
                        }),
                        option: (
                          styles,
                          { data, isDisabled, isFocused, isSelected }
                        ) => {
                          return {
                            ...styles,
                            borderRadius: "20px",
                            backgroundColor: isDisabled
                              ? undefined
                              : isSelected
                              ? "blue"
                              : isFocused
                              ? "#ffefb6"
                              : undefined,
                            color: isDisabled
                              ? "#ccc"
                              : isSelected
                              ? "white"
                                ? "white"
                                : "black"
                              : "black",

                            ":active": {
                              ...styles[":active"],
                              backgroundColor: !isDisabled
                                ? isSelected
                                  ? "yellow"
                                  : "blue"
                                : undefined,
                              color: isSelected ? "black" : "white",
                            },
                          };
                        },
                      }}
                    />
                  )}
                />
                {errors.subjects && errors.subjects.message && (
                  <p style={{ color: "red" }}>{errors.subjects.message}</p>
                )}
                {errors.subjects && errors.subjects.label && (
                  <p style={{ color: "red" }}>
                    {errors.subjects.label.message}
                  </p>
                )}
              </Grid>
            )}
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
            sx={{
              m: 2,
              color: "white",
              borderRadius: "20px",
              boxShadow: "none",
            }}
          >
            <Link
              href={{
                pathname: "/apply/sec1",
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
            onClick={handleSubmit(onSubmit)}
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
