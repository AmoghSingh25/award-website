import applicant_jury from "../../../lib/admin/applicant_jury";

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    const result = await applicant_jury(id);
    if (result.status === "Failed") {
      res.status(500).json({ status: "Failed" });
      return;
    }
    res.status(200).json({
      status: "Success",
      selectedJury: result.selectedJury,
      juryCount: result.juryCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed" });
  }
}
