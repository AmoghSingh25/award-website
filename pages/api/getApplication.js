import getApplication from "../../lib/getApplication";

export default async function handler(req, res) {
  const { id } = req.body;
  getApplication(id)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json({ error: true });
    });
}
