import conn from "../db";

export default async function getAllApplicants() {
  try {
    const query = `SELECT * FROM applicants WHERE overall_status = True`;
    const result = await conn.query(query);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}
