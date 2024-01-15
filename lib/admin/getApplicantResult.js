import conn from "../db";

export default async function getApplicantResult() {
  try {
    const sql = `SELECT applicant_jury_mapping.id AS id,applicant_jury_mapping.score AS score, applicant_jury_mapping.jury_id, applicant_jury_mapping.comment, applicants.name as applicantName,applicants.phone as phone, applicants.email as email, experience_details.subjects AS subjects, experience_details.grade AS grade, experience_details.teaching_exp AS teaching_exp, jury_details.name as juryName  FROM applicant_jury_mapping 
        INNER JOIN applicants ON applicant_jury_mapping.applicant_id = applicants.id
        INNER JOIN jury_details ON applicant_jury_mapping.jury_id = jury_details.id
        INNER JOIN experience_details ON applicant_jury_mapping.applicant_id = experience_details.id
        `;
    const resp = await conn.query(sql);
    return resp.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
