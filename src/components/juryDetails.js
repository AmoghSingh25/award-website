import React from "react";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styles from "./juryDetails.module.css";

export default function JuryDetails() {
  return (
    <Grid container spacing={2} className={styles.parentDiv}>
      <Grid
        item
        xs={4}
        sx={{
          backgroundColor: "gray",
        }}
      >
        <Box>Left picture</Box>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          backgroundColor: "blue",
        }}
      >
        <Box>Right Content</Box>
      </Grid>
    </Grid>
  );
}
