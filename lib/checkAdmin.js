import conn from "./db";

export default async function checkAdmin(id) {
  try {
    const sql = `SELECT * FROM jury_details WHERE id = $1`;
    const resp = await conn.query(sql, [id]);
    if (resp.rows.length === 0) throw new Error("Invalid Credentials");
    return {
      message: "Logged in",
      status: "Logged in",
      error: false,
      type: resp.rows[0].type,
      id: resp.rows[0].id,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
