import getDocument from "../../../lib/admin/getDocument";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { id, userID } = req.body;
  const isAdmin = await checkAdmin(userID);
  if (!isAdmin) {
    res.status(400).json({ status: "Failed" });
  }
  const document = await getDocument(id);
  if (document) {
    res.status(200).json(document);
  } else {
    res.status(404).json({ message: "Document not found" });
  }
}
