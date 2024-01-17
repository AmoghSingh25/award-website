import conn from "./db";

export default async function saveStatus(id) {
  const headers = {
    personal_details_status: 1,
    experience_details_status: 2,
    supporting_documents_status: 5,
    case_study_status: 4,
    award_achievements_status: 3,
    overall_status: 6,
  };
  const keys = Object.keys(headers);
  try {
    const query = `SELECT ${keys.join(", ")} FROM applicants WHERE id=$1`;
    const result = await conn.query(query, [id]);
    const rows = result.rows[0];
    let latest_status = 0;
    keys.forEach((key) => {
      if (rows[key]) {
        latest_status = Math.max(latest_status, headers[key]);
      }
    });
    latest_status = latest_status + 1;
    return { last_saved_section: latest_status, message: "success" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
