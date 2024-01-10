import conn from "../db";

export default async function applicant_jury(id) {
  const query = `SELECT id, name, email FROM jury_details WHERE is_active=True AND type='j'`;
  const query2 = `SELECT jury_id, COUNT(*) FROM applicant_jury_mapping GROUP BY jury_id;`;
  const query3 = `SELECT jury_id, COUNT(*) FROM applicant_jury_mapping WHERE applicant_id = $1 GROUP BY jury_id;`;
  try {
    const result = await conn.query(query);
    const result2 = await conn.query(query2);
    const result3 = await conn.query(query3, [id]);
    const selectedJury = result3.rows.map((row) => row.jury_id);
    const juryCount = result.rows.map((row) => {
      const juryID = row.id;
      const juryName = row.name;
      const count = result2.rows.find((row) => row.jury_id === juryID);
      const email = row.email;
      return {
        id: juryID,
        name: juryName,
        count: count ? count.count : 0,
        email: email,
      };
    });

    return {
      status: "Success",
      selectedJury: selectedJury,
      juryCount: juryCount,
    };
  } catch (error) {
    console.log(error);
    return { status: "Failed" };
  }
}
