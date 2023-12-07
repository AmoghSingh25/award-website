import saveSection from "../../lib/saveSection";
import checkUser from "../../lib/checkUser";
import saveDocumentPart from "../../lib/saveDocumentPart";

export default async function saveSection5(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    console.log("Save documents called");
    const { tableName, id, id_card, awards, other_documents, document_id } =
      req.body;
    const auth = await checkUser(id);
    if (!auth.isAuthenticated) {
      return res.status(400).json({ message: "Invalid user", error: true });
    }
    let resp = [];
    if (document_id == 1) {
      resp = await saveSection(tableName, {
        id_card: id_card,
        id: id,
      });
    }
    if (document_id == 2) {
      resp = await saveDocumentPart(document_id, id, awards);
    }
    if (document_id == 3) {
      resp = await saveDocumentPart(document_id, id, other_documents);
    }

    res
      .status(200)
      .json({ message: "Save section called", error: false, id: resp.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error, error: true });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
    externalResolver: true,
  },
};
