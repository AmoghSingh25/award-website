import conn from "../db";

export default async function juryBoard(id) {
  try {
    const query = `SELECT applicant_jury_mapping.applicant_id as id,applicant_jury_mapping.score as score, applicants.name as name, applicant_jury_mapping.comment, applicants.email as email, applicants.phone as phone FROM applicant_jury_mapping  INNER JOIN applicants on applicants.id = applicant_jury_mapping.applicant_id WHERE jury_id = $1;`;
    const result = await conn.query(query, [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}
