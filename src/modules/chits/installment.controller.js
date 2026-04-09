const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

// Generate installments for a chit
exports.generateInstallments = async (req, res) => {
  try {
    const { chitId } = req.body;

    const chit = await db.chitGroup.findUnique({
      where: { id: chitId }
    });

    if (!chit) {
      return res.status(404).json({ message: "Chit not found" });
    }

    const installments = [];

    for (let i = 1; i <= chit.durationMonths; i++) {
      const dueDate = new Date(chit.startDate);
      dueDate.setMonth(dueDate.getMonth() + (i - 1));

      installments.push({
        chitId,
        monthNumber: i,
        dueDate
      });
    }

    await db.installment.createMany({
      data: installments
    });

    res.json({ message: "Installments created", count: installments.length });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getInstallments = async (req, res) => {
  try {
    const { chitId } = req.params;

    const data = await db.installment.findMany({
      where: { chitId: Number(chitId) },
      orderBy: { monthNumber: "asc" }
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};