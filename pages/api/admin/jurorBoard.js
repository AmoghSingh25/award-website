import juryBoard from "../../../lib/admin/jurorBoard";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Only POST requests allowed" });
    return;
  }
  const { id } = req.body;
  try {
    const result = await juryBoard(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
