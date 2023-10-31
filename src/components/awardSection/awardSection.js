"use client";
import React from "react";
import styles from "./awardSection.module.css";

export default function AwardSection() {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <h1>Front</h1>
        </div>
        <div className={styles.flipCardBack}>
          <h1>Back</h1>
        </div>
      </div>
    </div>
  );
}
