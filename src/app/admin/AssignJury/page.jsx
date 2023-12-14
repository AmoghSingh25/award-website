import React from "react";
import ApplicantDashboard from "@/components/applicantDashboard";
import AdminPanel from "../adminPanel/AdminPanel";
function page() {
  return (
    <div>
      <AdminPanel page_id={1} />
      <ApplicantDashboard />
    </div>
  );
}

export default page;
