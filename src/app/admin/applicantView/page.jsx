"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <Box>
      <h1>Applicant View</h1>
      <h2>{id}</h2>
    </Box>
  );
}
