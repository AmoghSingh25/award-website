import checkUser from "../../lib/checkUser";

export default async function checkAuth(req, res) {
  if (req.method !== "POST") res.status(404).json({ message: "Not found" });
  try {
    checkUser(req.body.id).then((resp) => {
      if (resp.isAuthenticated) {
        res.status(200).json({
          message: "true",
          error: false,
          completed: resp.completed,
          last_unsaved_section: resp.last_unsaved_section,
        });
      } else {
        res.status(400).json({ message: "false", error: true });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user", error: true });
  }
}
