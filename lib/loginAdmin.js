import conn from "./db";

export default async function loginAdmin(username, password) {
  try {
    const sql = `SELECT id FROM jury_details WHERE username = $1`;
    const resp = await conn.query(sql, [username]);
    const sql2 = `SELECT * FROM jury_details WHERE id = $1 AND password = crypt($2, password)`;
    const resp2 = await conn.query(sql2, [resp.rows[0].id, password]);
    if (resp2.rows.length === 0) throw new Error("Invalid Credentials");
    return {
      message: "Logged in",
      status: "Logged in",
      error: false,
      type: resp2.rows[0].type,
      id: resp2.rows[0].id,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
