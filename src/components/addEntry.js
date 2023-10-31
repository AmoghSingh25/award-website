import { TextField } from "@mui/material";
import React, { useState } from "react";

export default function addEntry({ handleChange }) {
  <TextField
    id="outlined-basic"
    label="Outlined"
    variant="outlined"
    onChange={handleChange}
  />;
}
