import juryResults from "../../../lib/admin/juryResult";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  const { userID } = req.body;
  try {
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await juryResults();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ status: "Failed" });
  }
}
