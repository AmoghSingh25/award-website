import conn from "./db";

export default function getApplication(id) {
  return conn
    .query(
      `
        SELECT * FROM personal_details
        WHERE id = $1
        `,
      [id]
    )
    .then((res) => {
      if (res.rows.length > 0) {
        return res.rows[0];
      } else {
        throw new Error("No application found");
      }
    });
}
