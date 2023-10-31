import conn from "./db";

export default async function checkPrevSaved(userId) {
  const headers = {
    personal_details_status: 1,
    experience_details_status: 2,
    award_achievements_status: 3,
    case_study_status: 4,
    supporting_documents_status: 5,
  };
  const keys = Object.keys(headers);
  try {
    const query = `SELECT ${keys.join(", ")} FROM applicants WHERE id=$1`;
    const result = await conn.query(query, [userId]);
    const rows = result.rows[0];
    let last_unsaved = 6;
    keys.forEach((key) => {
      if (!rows[key]) {
        last_unsaved = Math.min(last_unsaved, headers[key]);
      }
    });
    return { last_unsaved_section: last_unsaved, message: "success" };
  } catch (error) {
    throw error;
  }
}
