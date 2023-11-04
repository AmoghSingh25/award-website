import conn from "../db";

export default async function applicant_jury(id) {
  const query = `SELECT * FROM applicant_jury_mapping WHERE applicant_id = $1`;
  try {
    const result = await conn.query(query, [id]);
    return { data: result.rows, status: "Success" };
  } catch (error) {
    console.log(error);
    return { status: "Failed" };
  }
}
