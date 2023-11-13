import { generate } from "generate-password";
import conn from "./db.js";

async function generateOTP(key) {
  if (!key) {
    throw new Error("Key is required");
  }
  const password = generate({
    length: 6,
    numbers: true,
    symbols: false,
    strict: true,
    lowercase: false,
    uppercase: false,
  });
  const resp = await conn.query(
    "INSERT INTO OTPs (key, otp, time) VALUES ($1, crypt($2, gen_salt('bf')), $3)",
    [key, password, Date.now()]
  );
  return password;
}

async function verifyOTP(key, otp) {
  try {
    otp = otp.toString();
    const resp = await conn.query(
      "SELECT time FROM otps WHERE key = $1 AND otp = crypt($2, otp)",
      [key, otp]
    );
    const time = resp.rows[0].time;
    if (Date.now() - time < 600000) {
      await conn.query("DELETE FROM otps WHERE key = $1", [key]);
      return true;
    } else {
      const del = await conn.query("DELETE FROM otps WHERE key = $1", [
        key,
        otp,
      ]);
      throw new Error("OTP Expired");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { generateOTP, verifyOTP };
