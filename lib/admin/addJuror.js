import conn from "../db";

export default async function addJuror(
  name,
  email,
  phone,
  password,
  secondary_phone
) {
  const query = `INSERT INTO jury_details (name, email, primary_phone, password, secondary_phone) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5) RETURNING id`;
  const values = [name, email, phone, password, secondary_phone];
  try {
    const result = await conn.query(query, values);
    return { id: result.rows[0].id, status: "Success" };
  } catch (error) {
    throw error;
  }
}
