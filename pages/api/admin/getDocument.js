import getDocument from "../../../lib/admin/getDocument";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { id } = req.body;
  const document = await getDocument(id);
  if (document) {
    res.status(200).json(document);
  } else {
    res.status(404).json({ message: "Document not found" });
  }
}
