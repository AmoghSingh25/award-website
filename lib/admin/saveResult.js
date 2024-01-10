import conn from "../db";

export default function saveResult(juryId, id, comment, score) {
  try {
    console.log(score);
    const sql = `UPDATE applicant_jury_mapping SET comment = $1, score = $2 WHERE applicant_id = $3 AND jury_id = $4`;
    const params = [comment, score, id, juryId];
    const resp = conn.query(sql, params);
    console.log(resp);
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
