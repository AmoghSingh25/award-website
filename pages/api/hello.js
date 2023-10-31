import checkUser from "../../lib/checkUser";

export default async function hello(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    checkUser(req.body.id).then((resp) => {
      if (resp.message === "true") {
        return res.status(200).json({ message: "true" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user" });
  }
}
