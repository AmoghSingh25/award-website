import React from "react";
import TopBar from "./topBar";
import Typography from "@mui/material/Typography";

const SectionHeader = ({ sectionNo, subText, allReq }) => {
  return (
    <>
      <TopBar currentSection={sectionNo} totalSections={6} />
    </>
  );
};

export default SectionHeader;
