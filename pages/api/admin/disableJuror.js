import disableJuror from "../../../lib/admin/disableJuror";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  try {
    const { id, is_active, userID } = req.body;
    const isAdmin = checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await disableJuror(id, is_active);
    if (result.status === "Failed") {
      res.status(500).json({ status: "Failed" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed" });
  }
}
