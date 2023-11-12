import conn from "../db";

export default function saveResult(juryId, id, comment, status) {
  try {
    const sql = `UPDATE applicant_jury_mapping SET comment = $1, review_status = $2 WHERE applicant_id = $3 AND jury_id = $4`;
    const params = [comment, status, id, juryId];
    const resp = conn.query(sql, params);
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
