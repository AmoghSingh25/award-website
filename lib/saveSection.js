import conn from "./db.js";

export default async function saveSection(tableName, data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO ${tableName} (${keys.join(
      ", "
    )}) VALUES (${values.map((v, i) => `$${i + 1}`)})
    ON CONFLICT (id) DO UPDATE SET (${keys.join(", ")}) = (${values.map(
      (v, i) => `$${i + 1}`
    )})
    RETURNING id`;
    console.log(query);
    const result = await conn.query(query, values);
    const query2 = `UPDATE applicants SET ${tableName}_status =true WHERE id=$1;`;
    await conn.query(query2, [data.id]);
    return { message: "success", id: result.rows[0].id };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
