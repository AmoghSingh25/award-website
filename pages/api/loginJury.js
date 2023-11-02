import loginJury from "../../lib/loginJury";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const ret = await loginJury(req.body.email, req.body.phone);
    res.status(200).json({
      message: "Logged in",
      status: "Logged in",
      error: false,
      id: ret.id,
    });
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
      .json({ message: error, status: "Error logging in", error: true });
  }
}
