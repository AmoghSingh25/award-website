import getJurors from "../../../lib/admin/getJurors";

export default async function handler(req, res) {
  try {
    const result = await getJurors();
    if (result.status === "Failed") {
      res.status(500).json({ status: "Failed" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Failed" });
  }
}
