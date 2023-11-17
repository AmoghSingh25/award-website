import updateJuryApplicant from "../../../lib/admin/updateJuryApplicant";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Invalid method" });
    return;
  }
  try {
    const { jury, applicantID, userID } = req.body;
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await updateJuryApplicant(jury, applicantID);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid user", error: true });
  }
}
