import downloadData from "../../../lib/admin/downloadData";

export default async function handler(req, res) {
  try {
    const result = await downloadData();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
