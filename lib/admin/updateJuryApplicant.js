import conn from "../db";

export default async function updateJuryApplicant(jury, applicantID) {
  try {
    const deleteExisting = `DELETE FROM applicant_jury_mapping WHERE applicant_id = $1`;
    await conn.query(deleteExisting, [applicantID]);
    const sql = `INSERT INTO applicant_jury_mapping (jury_id, applicant_id) VALUES ($1, $2)`;
    jury.forEach(async (element) => {
      await conn.query(sql, [element, applicantID]);
    });
    return { message: "Jury updated" };
  } catch (err) {
    throw err;
  }
}
