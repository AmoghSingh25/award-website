import saveResult from "../../../lib/admin/saveResult";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { juryId, id, comment, status, userID } = req.body;
  const isAdmin = await checkAdmin(userID);
  if (!isAdmin) {
    res.status(400).json({ status: "Failed" });
  }
  const resp = await saveResult(juryId, id, comment, status);
  if (resp.rowCount === 1) {
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Error" });
  }
}
