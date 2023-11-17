import addJuror from "../../../lib/admin/addJuror";
import checkAdmin from "../../../lib/checkAdmin";

export default async function handler(req, res) {
  try {
    const { name, email, phone, secondary_phone, username, userID } = req.body;
    const isAdmin = await checkAdmin(userID);

    if (!isAdmin) {
      res.status(400).json({ status: "Failed" });
    }
    const result = await addJuror(
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
