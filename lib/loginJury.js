import conn from "./db.js";

export default async function loginJury(email, phone) {
  try {
    const sql = `SELECT * FROM jury_details WHERE email = $1 AND primary_phone = $2;`;
    const result = await conn.query(sql, [email, phone]);
    console.log(result.rows.length);
    if (result.rows.length === 0) {
      throw new Error("Invalid Credentials");
    }
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}
