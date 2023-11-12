import addAdmin from "../../../lib/admin/addAdmin";

export default async function handler(req, res) {
  try {
    const { name, email, phone, secondary_phone, username } = req.body;
    const result = await addAdmin(
      name,
      email,
      phone,
      secondary_phone,
      username
    );
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
