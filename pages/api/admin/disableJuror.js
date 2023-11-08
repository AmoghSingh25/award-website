import disableJuror from "../../../lib/admin/disableJuror";

export default async function handler(req, res) {
  try {
    const { id, is_active } = req.body;
    const result = await disableJuror(id, is_active);
    if (result.status === "Failed") {
      res.status(500).json({ status: "Failed" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed" });
  }
}
