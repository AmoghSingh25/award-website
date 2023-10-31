import login from "../../lib/login";
import saveStatus from "../../lib/saveStatus";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const id = await login(req.body.email, req.body.phone, req.body.name);
    const lastSaved = await saveStatus(id);
    const last_saved = lastSaved.last_saved_section;
    if (last_saved === 7) {
      res.status(400).json({
        message: "Already submitted",
        status: "Already submitted",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Logged in",
      status: "Logged in",
      last_saved: last_saved,
      error: false,
      id: id,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      res.status(400).json({
        message: "User already exists",
        status: "User already exists",
        error: true,
      });
      return;
    }
    if (error.message === "User does not exist") {
      res.status(400).json({
        message: "User does not exist",
        status: "User does not exist",
        error: true,
      });
      return;
    }
    res
      .status(400)
      .json({ message: error, status: "Error logging in", error: true });
  }
}
