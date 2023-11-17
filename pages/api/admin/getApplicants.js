import getAllApplicants from "../../../lib/admin/getAllApplicants";
import checkAdmin from "../../../lib/checkAdmin";

export default async function getApplicants(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not found" });
    return;
  }
  try {
    const { userID } = req.body;
    const isAdmin = await checkAdmin(userID);
    if (!isAdmin) {
      console.log(error);
      res.status(400).json({ status: "Failed" });
    }
    getAllApplicants().then((resp) => {
      res.status(200).json(resp);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid user", error: true });
  }
}
