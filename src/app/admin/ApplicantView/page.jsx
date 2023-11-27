import React from "react";
import AdminPanel from "../adminPanel/AdminPanel";
import Result from "src/components/result";
function page() {
  return (
    <>
      <AdminPanel page_id={2} />
      <Result />
    </>
  );
}

export default page;
