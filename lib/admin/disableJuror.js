import conn from "../db";

export default async function disableJuror(id, is_active) {
  const query = `UPDATE jury_details SET is_active = $1 WHERE id = $2`;
  try {
    const result = await conn.query(query, [is_active, id]);
    return { data: result.rows, status: "Success" };
  } catch (error) {
    console.log(error);
    return { status: "Failed" };
  }
}
