import getApplicantResult from "../../../lib/admin/getApplicantResult";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Only POST requests allowed" });
    return;
  }
  try {
    const { userID } = req.body;
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const resp = await getApplicantResult();
    res.status(200).json({ message: "Success", data: resp });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
