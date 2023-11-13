import conn from "./db.js";
import { verifyOTP } from "./manageOTP.js";

export default async function createUser(email, phone, name, otp) {
  try {
    const verified = await verifyOTP(email, otp);

    if (!verified) {
      throw new Error("Invalid OTP");
    }
    const resp = await conn.query(
      "INSERT INTO applicants (email, phone, name) VALUES ($1, $2, $3) RETURNING id",
      [email, phone, name]
    );
    const id = resp.rows[0].id;
    return id;
  } catch (err) {
    throw err;
  }
}
