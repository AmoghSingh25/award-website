import conn from "../db.js";

export default async function getDocument(id) {
  const query = `SELECT * FROM supporting_documents WHERE id = $1`;
  const values = [id];
  try {
    const result = await conn.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return false;
  }
}
