import saveAwards from "../../lib/saveAwards";

export default async function login(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found", error: true });
  try {
    const { tableName, data } = req.body;
    const resp = await saveAwards(tableName, data);
    const id = resp.id;
    res
      .status(200)
      .json({ message: "Save section called", error: false, id: id });
  } catch (error) {
    res.status(400).json({ message: error, error: true });
  }
}
