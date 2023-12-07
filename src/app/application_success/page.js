import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ApplicationSuccessPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h4"
        style={{ marginBottom: "2rem", textAlign: "center", color: "white" }}
      >
        Your application has been successfully submitted!
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go back to homepage
      </Button>
    </div>
  );
};

export default ApplicationSuccessPage;
