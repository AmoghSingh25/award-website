import conn from "../../lib/db";
import saveSection from "../../lib/saveSection";
import checkUser from "../../lib/checkUser";

export default async function saveSection_api(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const { tableName, data } = req.body;
    const auth = await checkUser(data.id);
    if (!auth.isAuthenticated) {
      return res.status(400).json({ message: "Invalid user", error: true });
    }
    const resp = await saveSection(tableName, data);
    res
      .status(200)
      .json({ message: "Save section called", error: false, id: resp.id });
  } catch (error) {
    res.status(400).json({ message: error, error: true });
  }
}
