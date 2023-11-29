import conn from "./db";

export default async function getData(tableName, id) {
  const tables = [
    "personal_details",
    "experience_details",
    "supporting_documents",
    "case_study",
    "award_achievements",
    "overall",
  ];
  try {
    if (!tables.includes(tableName)) {
      throw new Error("Invalid table name");
    }
    const query = `SELECT ${tableName}_status FROM applicants WHERE id = $1`;
    const { rows } = await conn.query(query, [id]);
    const isFilled = rows[0][`${tableName}_status`];
    if (isFilled && tableName !== "overall") {
      const query = `SELECT * FROM ${tableName} WHERE id = $1`;
      const { rows } = await conn.query(query, [id]);
      return {
        error: false,
        data: rows,
        isFilled: isFilled,
        message: "Success",
      };
    }
    return { error: false, isFilled: isFilled };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
