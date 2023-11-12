import conn from "./db";
import nodemailer from "nodemailer";

export default async function sendMail(subject, message, email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "noreply.timeseduexawards@vit.ac.in",
      pass: "toiawards2023",
    },
  });
  await transporter.sendMail({
    from: "noreply.timeseduexawards@vit.ac.in",
    to: email,
    subject: subject,
    html: message,
  });
}
