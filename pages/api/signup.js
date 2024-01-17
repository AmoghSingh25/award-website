import signup from "../../lib/signup";
import saveStatus from "../../lib/saveStatus";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const id = await signup(req.body.email, req.body.phone, req.body.name);
    res.status(200).json({
      message: "OTP Sent",
      status: "OTP Sent",
      error: false,
    });
  } catch (error) {
    console.log(error);
    if (error.message === "User already exists") {
      res.status(400).json({
        message: "User already exists",
        status: "User already exists",
        error: true,
      });
      return;
    } else if (error.message === "Registration is closed") {
      res.status(400).json({
        message: "Registration is closed",
        status: "Registration is closed",
        error: true,
      });
      return;
    }
    res
      .status(400)
      .json({ message: error, status: "Error signing up", error: true });
  }
}
