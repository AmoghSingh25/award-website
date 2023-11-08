import juryResults from "../../../lib/admin/juryResult";

export default async function handler(req, res) {
  try {
    const result = await juryResults();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ status: "Failed" });
  }
}
