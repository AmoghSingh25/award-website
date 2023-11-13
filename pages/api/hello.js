import { generateOTP, verifyOTP, check } from "../../lib/manageOTP";

export default async function hello(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    // const OTP = generateOTP("test");
    check();
    res.status(200).json({ password: OTP });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid user" });
  }
}
