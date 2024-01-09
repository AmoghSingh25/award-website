import conn from "../db";

export default function saveResult(juryId, id, comment, status, score) {
  try {
    console.log(score);
    const sql = `UPDATE applicant_jury_mapping SET comment = $1, review_status = $2, score = $3 WHERE applicant_id = $4 AND jury_id = $5`;
    const params = [comment, status, score, id, juryId];
    const resp = conn.query(sql, params);
    console.log(resp);
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
