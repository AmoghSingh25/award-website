import checkAdmin from "../../lib/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(400).json({ status: "Failed" });
  try {
    const { id, password } = req.body;
    const result = await checkAdmin(id, password);
    if (result.status === "Logged in") {
      res.status(200).json({
        status: "Logged in",
        id: result.id,
        type: result.type,
      });
    } else {
      res.status(400).json({ status: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed" });
  }
}
