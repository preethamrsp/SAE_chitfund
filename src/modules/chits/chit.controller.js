const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

exports.createChit = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, totalAmount, durationMonths, startDate } = req.body;

    if (!name || !totalAmount || !durationMonths || !startDate) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const monthlyAmount = totalAmount / durationMonths;

    const chit = await db.chitGroup.create({
      data: {
        name,
        totalAmount,
        durationMonths,
        monthlyAmount,
        startDate: new Date(startDate)
      }
    });

    console.log("CREATED:", chit);

    res.json(chit);

  } catch (err) {
  console.error("ERROR FULL:", err);

  res.status(500).json({
    message: err.message,
    details: err.meta
  });
}
};