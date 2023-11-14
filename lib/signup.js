import conn from "./db.js";
import { generateOTP } from "./manageOTP.js";
import sendMail from "./sendMail.js";

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
    const password = await generateOTP(email);
    await sendMail(
      "Times EduEx Awards 2023 - Credentials",
      `
      <h1>Times EduEx Awards 2023 - Credentials</h1>
      <p>Your OTP is ${password}</p>
      `,
      email
    );
  } else {
    console.log("Error");
    throw new Error("User already exists");
  }
}
