import React from "react";
import AdminPanel from "../adminPanel/AdminPanel";
import JuryResult from "@/components/result";
function page() {
  return (
    <>
      <AdminPanel page_id={2} />
      <JuryResult />
    </>
  );
}

export default page;
