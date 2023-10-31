import checkUser from "../../lib/checkUser";
import saveApplication from "../../lib/saveApplication";

export default async function saveSection_api(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const { id } = req.body;
    const auth = await checkUser(id);
    if (!auth.isAuthenticated) {
      return res.status(400).json({ message: "Invalid user", error: true });
    }
    const ret_id = await saveApplication(id);
    res
      .status(200)
      .json({ message: "Save application", error: false, id: ret_id });
  } catch (error) {
    res.status(400).json({ message: error, error: true });
  }
}
