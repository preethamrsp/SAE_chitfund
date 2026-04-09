const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

exports.getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const credits = await db.ledger.aggregate({
      where: {
        userId,
        type: "CREDIT"
      },
      _sum: { amount: true }
    });

    const debits = await db.ledger.aggregate({
      where: {
        userId,
        type: "DEBIT"
      },
      _sum: { amount: true }
    });

    const balance =
      (credits._sum.amount || 0) - (debits._sum.amount || 0);

    res.json({
      balance,
      totalCredits: credits._sum.amount || 0,
      totalDebits: debits._sum.amount || 0
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await db.ledger.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(transactions);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};