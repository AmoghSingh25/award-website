import conn from "../db";

export default async function downloadData() {
  try {
    const query = `SELECT * FROM applicants`;
    const query2 = `SELECT * FROM personal_details`;
    const query3 = `SELECT * FROM experience_details`;
    const query4 = `SELECT id, array_agg(question) AS question, array_agg(answer) AS answer FROM case_study GROUP BY id;`;
    const result = await conn.query(query);
    const result2 = await conn.query(query2);
    const result3 = await conn.query(query3);
    const result4 = await conn.query(query4);
    let resp = [];
    result.rows.forEach((element, id) => {
      resp[id] = {};
      resp[id] = Object.assign(result.rows[id], result2.rows[id]);
      resp[id] = Object.assign(resp[id], result3.rows[id]);
      resp[id] = Object.assign(resp[id], result4.rows[id]);
    });
    // console.log(result2.rows);
    // console.log(result3.rows);
    // console.log(result4.rows);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
}
