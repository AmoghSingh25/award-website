import saveAwards from "../../lib/saveAwards";

export default async function login(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found", error: true });
  try {
    const { tableName, data, id } = req.body;
    const resp = await saveAwards(tableName, data, id);
    const app_id = resp.id;
    res
      .status(200)
      .json({ message: "Save section called", error: false, id: app_id });
  } catch (error) {
    res.status(400).json({ message: error, error: true });
  }
}
