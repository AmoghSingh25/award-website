import getJury from "../../../lib/admin/getJury";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  try {
    const { userID } = req.body;
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await getJury();
    if (result.status === "Failed") {
      res.status(500).json({ status: "Failed" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Failed" });
  }
}
