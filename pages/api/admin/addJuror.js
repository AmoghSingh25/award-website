import addJuror from "../../../lib/admin/addJuror";

export default async function handler(req, res) {
  try {
    const { name, email, phone, password } = req.body;
    const result = await addJuror(name, email, phone, password);
    if (result.status === "Success") {
      res.status(200).json({ status: "Success", id: result.id });
    } else {
      res.status(400).json({ status: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed" });
  }
}
