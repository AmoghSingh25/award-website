import conn from "./db.js";

export default async function signup(email, phone, name) {
  let resp = await conn.query(
    "SELECT id FROM applicants WHERE email = $1 AND phone = $2",
    [email, phone]
  );
  if (resp.rows.length === 0) {
    resp = await conn.query("SELECT * FROM applicants WHERE email = $1", [
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
    resp = await conn.query(
      "INSERT INTO applicants (email, phone, name) VALUES ($1, $2, $3) RETURNING id",
      [email, phone, name]
    );
    const id = resp.rows[0].id;
    return id;
  } else {
    console.log("Error");
    throw new Error("User already exists");
  }
}
