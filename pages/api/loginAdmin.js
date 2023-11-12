import loginAdmin from "../../lib/loginAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const ret = await loginAdmin(req.body.username, req.body.password);
    if (!ret.error) {
      res.status(200).json({
        message: "Logged in",
        status: "Logged in",
        error: false,
        type: ret.type,
        id: ret.id,
      });
    }
  } catch (error) {
    if (error.message === "Invalid Credentials") {
      res.status(400).json({
        message: "Invalid Credentials",
        status: "Invalid Credentials",
        error: true,
      });
      return;
    }
    res
      .status(400)
      .json({
        message: "Error logging in",
        status: "Error logging in",
        error: true,
      });
  }
}
