import conn from "./db.js";
import { generateOTP } from "./manageOTP.js";

export default async function signup(email, phone, name) {
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
    await generateOTP(email);
  } else {
    console.log("Error");
    throw new Error("User already exists");
  }
}
