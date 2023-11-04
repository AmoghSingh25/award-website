import conn from "../db";

export default async function addJuror(name, email, phone, password) {
  const query = `INSERT INTO jury_details (name, email, primary_phone, password) VALUES ($1, $2, $3, $4) RETURNING id`;
  const values = [name, email, phone, password];
  try {
    const result = await conn.query(query, values);
    console.log(result);
    return { id: result.rows[0].id, status: "Success" };
  } catch (error) {
    console.log(error);
    return { status: "Failed" };
  }
}
