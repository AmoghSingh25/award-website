"use client";
import { useEffect } from "react";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
      }}
    >
      <h1>Applications for the awards have been closed</h1>
      <button
        style={{
          padding: "1rem",
          borderRadius: "1rem",
          background: "white",
          color: "black",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        <a href="/">Go Back</a>
      </button>
    </div>
  );
}
