import getApplicantData from "../../lib/getApplicantData";

export default async function handler(req, res) {
  const { id } = req.body;
  const data = await getApplicantData(id);
  res.status(200).json(data);
}
