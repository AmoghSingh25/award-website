import createUser from "../../lib/createUser";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Not found" });
  try {
    const id = await createUser(
      req.body.email,
      req.body.phone,
      req.body.name,
      req.body.otp
    );
    res.status(200).json({ message: "Created user", id: id, error: false });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error, error: true });
  }
}
