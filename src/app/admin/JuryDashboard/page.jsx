import React from "react";
import AdminPanel from "../adminPanel/AdminPanel";
import JuryDashboard from "src/components/juryDashboard";
function page() {
  return (
    <div>
      <AdminPanel page_id={3} />
      <JuryDashboard />
    </div>
  );
}

export default page;
