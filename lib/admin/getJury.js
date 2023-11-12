import conn from "../db";

export default async function getJury() {
  const query = `SELECT id, name, email, primary_phone as phone,username, is_active FROM jury_details WHERE type='j'`;
  try {
    const result = await conn.query(query);
    return { data: result.rows, status: "Success" };
  } catch (error) {
    console.log(error);
    return { status: "Failed" };
  }
}
