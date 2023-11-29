import getData from "../../lib/getData";

export default async function handler(req, res) {
  try {
    const { tableName, id } = req.body;
    const data = await getData(tableName, id);
    data.message = "Success";
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
