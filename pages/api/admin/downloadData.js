import downloadData from "../../../lib/admin/downloadData";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  try {
    const { userID } = req.body;
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await downloadData();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
