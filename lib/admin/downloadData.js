import conn from "../db";

export default async function downloadData() {
  try {
    const query = `SELECT * FROM applicants`;
    const result = await conn.query(query);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}
