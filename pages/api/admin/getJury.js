import getJury from "../../../lib/admin/getJury";

export default async function handler(req, res) {
  try {
    const result = await getJury();
    if (result.status === "Failed") {
      res.status(500).json({ status: "Failed" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Failed" });
  }
}
