import juryBoard from "../../../lib/admin/jurorBoard";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Only POST requests allowed" });
    return;
  }
  const { id, userID } = req.body;
  try {
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await juryBoard(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
