import conn from "./db";

export default function logger(id, error, location) {
  const query = `INSERT INTO applicant_logs (id, error, location) VALUES ($1, $2, $3)`;
  const values = [id, error, location];
  conn
    .query(query, values)
    .then((res) => {
      console.log("Logged");
    })
    .catch((err) => {
      console.log(err);
    });
}
