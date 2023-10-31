import conn from "./db";

export default async function getApplicantData(id) {
  const query = `SELECT email, phone, institute, city, district, state, name, teaching_exp, institute_exp, subjects, grade, professional_membership FROM get_applicant_data($1);`;
  const data = await conn.query(query, [id]);
  const query2 = `SELECT question,answer FROM case_study WHERE id=$1;`;
  const data2 = await conn.query(query2, [id]);
  const query3 = `SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 1)) AS id, name, year, description AS desc FROM award_achievements WHERE id=$1 AND type='a';`;
  const data3 = await conn.query(query3, [id]);
  const query4 = `SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 1)) AS id, name, year, description AS desc FROM award_achievements WHERE id=$1 AND type='c';`;
  const data4 = await conn.query(query4, [id]);
  return {
    ...data.rows[0],
    case_study: data2.rows,
    awards: data3.rows,
    achievements: data4.rows,
  };
}
