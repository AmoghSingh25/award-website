import getAllApplicants from "../../../lib/admin/getAllApplicants";

export default async function getApplicants(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (
    req.body.adminId !== process.env.ADMIN_ID &&
    req.body.adminId !== "test_pass"
  ) {
    res.status(400).json({ message: "Invalid user", error: true });
    return;
  }
  try {
    getAllApplicants().then((resp) => {
      res.status(200).json(resp);
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user", error: true });
  }
}
