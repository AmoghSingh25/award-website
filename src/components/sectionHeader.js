import React from "react";
import TopBar from "./topBar";
import Typography from "@mui/material/Typography";

const SectionHeader = ({ sectionNo }) => {
  return (
    <>
      <TopBar currentSection={sectionNo} totalSections={6} />
    </>
  );
};

export default SectionHeader;
