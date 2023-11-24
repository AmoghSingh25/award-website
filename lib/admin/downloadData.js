import conn from "../db";

export default async function downloadData() {
  try {
    const query = `SELECT * FROM applicants LEFT JOIN personal_details on applicants.id=personal_details.id LEFT JOIN experience_details on applicants.id = experience_details.id;`;
    // const query2 = `SELECT * FROM personal_details`;
    // const query3 = `SELECT * FROM experience_details`;
    const query4 = `SELECT id, array_agg(question) AS question, array_agg(answer) AS answer FROM case_study GROUP BY id;`;
    const result = await conn.query(query);
    // const result2 = await conn.query(query2);
    // const result3 = await conn.query(query3);
    const result4 = await conn.query(query4);
    let resp = {};

    result.rows.forEach((element, id) => {
      resp[element.id] = {};
      resp[element.id] = result.rows[id];
      // resp[id] = Object.assign(resp[id], result3.rows[id]);
      // resp[id] = Object.assign(resp[id], result4.rows[id]);
    });
    result4.rows.forEach((element, id) => {
      resp[element.id] = Object.assign(resp[element.id], result4.rows[id]);
    });
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
}
