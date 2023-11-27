import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import styles from "./page.module.css";

export default function DataComponent({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item, idx) => {
        return (
          <Grid
            key={idx}
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              component="h2"
              className={styles.inputLabel}
              width="100%"
              sx={{ mb: "1%", fontWeight: "bold", textAlign: "left" }}
            >
              {item.header}
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              width="100%"
              className={styles.dataText}
              sx={{ color: "white" }}
            >
              {item.data}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
