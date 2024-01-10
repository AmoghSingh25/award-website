import { generate } from "generate-password";
import conn from "./db.js";
import sendMail from "./sendMail.js";

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
  const resp1 = await conn.query("SELECT * FROM OTPs WHERE key=$1", [key]);
  if (resp1.rows.length > 0) {
    if (Date.now() - resp1.rows[0].time < 60000) {
      return;
    }
    await conn.query("DELETE FROM otps WHERE key = $1", [key]);
  }
  await conn.query(
    "INSERT INTO OTPs (key, otp, time) VALUES ($1, crypt($2, gen_salt('bf')), $3)",
    [key, password, Date.now()]
  );
  console.log("OTP GENERATED");
  await sendMail(
    "Times EduEx Awards 2023 - Credentials",
    `
    <h1>Times EduEx Awards 2023 - Credentials</h1>
    <p>Your OTP is ${password}</p>
    `,
    key
  );
  console.log("EMAIL SENT");
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
    } else if (Date.now() - time > 600000) {
      await conn.query("DELETE FROM otps WHERE key = $1", [key]);
      throw new Error("OTP Expired");
    } else {
      throw new Error("OTP Invalid");
    }
  } catch (error) {
    await conn.query("DELETE FROM otps WHERE key = $1", [key]);
    throw error;
  }
}

module.exports = { generateOTP, verifyOTP };
