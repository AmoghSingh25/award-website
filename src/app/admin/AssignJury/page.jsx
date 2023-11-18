import React from "react";
import ApplicantDashboard from "src/components/applicantDashboard";
import AdminPanel from "../adminPanel/AdminPanel";
function page() {
  return (
    <div>
      <AdminPanel />
      <ApplicantDashboard />
    </div>
  );
}

export default page;
