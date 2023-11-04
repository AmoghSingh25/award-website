import loginAdmin from "../../lib/loginAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const ret = await loginAdmin(req.body.email, req.body.phone);
    if(ret===true) {
    res.status(200).json({
      message: "Logged in",
      status: "Logged in",
      error: false,
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
      .json({ message: error, status: "Error logging in", error: true });
  }
}
