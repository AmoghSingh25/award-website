import conn from "./db";
import checkPrevSaved from "./checkPrevSaved";

export default async function checkUser(id) {
  const query = `SELECT * FROM applicants WHERE id = '${id}'`;
  try {
    const { rows } = await conn.query(query);
    if (rows.length === 0) {
      return { isAuthenticated: false };
    } else {
      const { last_unsaved_section } = await checkPrevSaved(id);
      return {
        isAuthenticated: true,
        completed: rows[0].overall_status,
        last_unsaved_section: last_unsaved_section,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error };
  }
}
