import logger from "../../lib/logger";

export default async function handler(req, res) {
  const { id, error, location } = req.body;
  logger(id, error, location);
  res.status(200).json({ status: "Logged" });
}
