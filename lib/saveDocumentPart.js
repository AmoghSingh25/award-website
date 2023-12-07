import conn from "./db";

export default async function saveDocumentPart(documentID, id, data) {
  try {
    let documentName = "awards";
    if (documentID == 3) {
      documentName = "other_documents";
    }
    const query = `UPDATE supporting_documents SET ${documentName} = $1 WHERE id = $2;`;
    const result = await conn.query(query, [data, id]);
    console.log(result);
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return error;
  }
}
