import saveSection from "../../lib/saveSection";
import checkUser from "../../lib/checkUser";

export default async function saveSection5(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const { tableName, id, id_card, awards, other_documents } = req.body;
    const auth = await checkUser(id);
    if (!auth.isAuthenticated) {
      return res.status(400).json({ message: "Invalid user", error: true });
    }
    const resp = await saveSection(tableName, {
      id_card: id_card,
      awards: awards,
      other_documents: other_documents,
      id: id,
    });
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
      sizeLimit: "30mb",
    },
    externalResolver: true,
  },
};
