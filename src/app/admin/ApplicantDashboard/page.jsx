import React from "react";
import ApplicantDashboard from "src/components/applicantDashboard";
import AdminPanel from "../adminPanel/page";
function page() {
  return (
    <div>
      <AdminPanel />
      <ApplicantDashboard />
    </div>
  );
}

export default page;
