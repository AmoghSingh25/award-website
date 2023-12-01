import conn from "../db";

export default async function juryResults() {
  const query = `SELECT * FROM jury_details WHERE type='j'; `;
  const query2 = `SELECT jury_id, COUNT(*) FROM applicant_jury_mapping GROUP BY jury_id`;
  try {
    const result = await conn.query(query);
    const result2 = await conn.query(query2);
    const selectedJury = result2.rows.map((row) => row.jury_id);
    const juryCount = result.rows.map((row) => {
      const juryID = row.id;
      const juryName = row.name;
      const juryEmail = row.email;
      const count = result2.rows.find((row) => row.jury_id === juryID);
      return {
        id: juryID,
        name: juryName,
        count: count ? count.count : 0,
        email: juryEmail,
      };
    });
    return {
      status: "Success",
      selectedJury: selectedJury,
      juryCount: juryCount,
    };
  } catch (error) {
    throw error;
  }
}
