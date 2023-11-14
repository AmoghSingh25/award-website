import conn from "./db.js";
import sendMail from "./sendMail.js";

export default async function saveApplication(id) {
  const headers = {
    personal_details_status: 1,
    experience_details_status: 2,
    award_achievements_status: 3,
    case_study_status: 4,
    supporting_documents_status: 5,
  };
  try {
    const query = `SELECT * FROM applicants WHERE id=$1;`;
    const result1 = await conn.query(query, [id]);
    const rows = result1.rows[0];
    let latest_status = 0;
    Object.keys(headers).forEach((key) => {
      if (rows[key]) {
        latest_status = Math.max(latest_status, headers[key]);
      }
    });
    if (latest_status < 5) {
      throw new Error("Please complete all sections before submitting");
    } else {
      const query2 = `UPDATE applicants SET overall_status = true WHERE id=$1 RETURNING id;`;
      const result = await conn.query(query2, [id]);
      sendMail(
        "Application Submitted - Times Education Excellence Awards 2021",
        "Thank you for submitting your application. We have received your application for the Times Education Excellence Awards 2023.",
        rows.email
      );
      return { message: "success", id: result.rows[0].id };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
