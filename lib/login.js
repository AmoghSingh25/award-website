import conn from "./db.js";

export default async function login(email, phone, name) {
  let resp = await conn.query(
    "SELECT id FROM applicants WHERE email ilike $1 AND phone = $2",
    [email, phone]
  );
  if (resp.rows.length === 0) {
    resp = await conn.query("SELECT * FROM applicants WHERE email ilike $1", [
      email,
    ]);
    if (resp.rows.length > 0) {
      throw new Error("User already exists");
    }
    resp = await conn.query("SELECT * FROM applicants WHERE phone = $1", [
      phone,
    ]);
    if (resp.rows.length > 0) {
      throw new Error("User already exists");
    }
    throw new Error("User does not exist");
  } else {
    const id = resp.rows[0].id;
    return id;
  }
}
