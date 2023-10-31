import React from "react";
import styles from "./topbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import {
  faCheckSquare,
  faCoffee,
  faUserAlt,
  faBriefcase,
  faAward,
  faPen,
  faFile,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function TopBar({ currentSection, totalSections }) {
  const icons = [faUserAlt, faBriefcase, faAward, faPen, faFile, faCheck];
  const sectionNames = [
    "Personal Details",
    "Teaching Experience",
    "Awards",
    "Case Study",
    "Supporting Documents",
    "Submission",
  ];
  const sectionItems = [
    <div
      key={0}
      className={
        1 == currentSection
          ? styles.pageBox + " " + styles.active
          : styles.pageBox
      }
    >
      <div
        className={styles.iconContainer}
        style={{
          backgroundColor:
            1 < currentSection
              ? "#00DB16"
              : 1 === currentSection
              ? "#F5C005"
              : "#FFFFFF",
        }}
      >
        <FontAwesomeIcon
          icon={icons[0]}
          className={styles.icon}
          color={1 <= currentSection ? "#FFFFFF" : "#000000"}
        />
      </div>
      <Typography
        variant="body1"
        className={
          1 == currentSection
            ? styles.pageText + " " + styles.active
            : styles.pageText
        }
        style={{
          fontWeight: 1 == currentSection ? "bold" : "normal",
        }}
      >
        {sectionNames[0]}
      </Typography>
    </div>,
  ];
  for (let i = 1; i < totalSections; i++) {
    const isActive = i === currentSection - 1;
    sectionItems.push(
      <div
        className={styles.iconDivide}
        style={{
          backgroundColor: i < currentSection ? "#F5C005" : "#707070",
        }}
      ></div>,
      <div
        className={
          isActive ? styles.pageBox + " " + styles.active : styles.pageBox
        }
      >
        <div
          className={styles.iconContainer}
          style={{
            backgroundColor:
              i < currentSection - 1
                ? "#00DB16"
                : i === currentSection - 1
                ? "#F5C005"
                : "#000000",
          }}
        >
          <FontAwesomeIcon
            icon={icons[i]}
            className={styles.icon}
            color={i < currentSection ? "#FFFFFF" : "#FFFFFF"}
          />
        </div>
        <Typography
          variant="body1"
          className={
            isActive ? styles.pageText + " " + styles.active : styles.pageText
          }
          style={{
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {sectionNames[i]}
        </Typography>
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.topBar}>
        {/* <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faUserAlt} color="white" />
      </div>
      <div className={styles.iconDivide}></div>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faUserAlt} color="white" />
      </div>
       */}
        {sectionItems}
      </div>
    </ThemeProvider>
  );
}
