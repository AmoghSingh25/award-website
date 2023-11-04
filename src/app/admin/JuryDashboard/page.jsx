import React from "react";
import AdminPanel from "../adminPanel/page"
import JuryDashboard from "src/components/juryDashboard";
function page() {
  return (
    <div>
      <AdminPanel/>
      <JuryDashboard />
    </div>
  );
}

export default page;
