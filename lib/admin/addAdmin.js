import conn from "../db";
import { generate } from "generate-password";

export default async function addAdmin(
  name,
  email,
  phone,
  secondary_phone,
  username
) {
  const password = generate({
    length: 15,
    numbers: true,
    symbols: true,
    strict: true,
  });
  const query = `INSERT INTO jury_details (name, email, primary_phone, password, secondary_phone, username,type) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5, $6, 'a') RETURNING id`;
  const values = [name, email, phone, password, secondary_phone, username];
  try {
    const result = await conn.query(query, values);
    await sendMail(
      "Times Edu Ex Awards 2023 - Credentials",
      `
      <h1>Times Edu Ex Awards 2023 - Credentials</h1>
      <p>Your username is ${username} and password is ${password}</p>
      <p>Click <a href="https://timeseduexawards.vit.ac.in/adminLogin">here</a> to login</p>
      `,
      email
    );
    return { id: result.rows[0].id, status: "Success" };
  } catch (error) {
    throw error;
  }
}
