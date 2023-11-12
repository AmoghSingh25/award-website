import sendMail from "../../lib/sendMail";

export default async function handler(req, res) {
  const { email, subject, message } = req.body;
  try {
    await sendMail(subject, message, email);
  } catch (err) {
    console.log(err);
  }
}
