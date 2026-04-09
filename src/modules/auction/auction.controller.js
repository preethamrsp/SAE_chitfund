const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

exports.placeBid = async (req, res) => {
  try {
    const userId = req.user.id;
    const { installmentId, bidAmount } = req.body;

    // Check installment
    const installment = await db.installment.findUnique({
      where: { id: installmentId }
    });

    if (!installment) {
      return res.status(404).json({ message: "Installment not found" });
    }

    // Prevent duplicate bid
    const existing = await db.bid.findUnique({
      where: {
        userId_installmentId: {
          userId,
          installmentId
        }
      }
    });

    if (existing) {
      return res.status(400).json({
        message: "You already placed a bid"
      });
    }

    const bid = await db.bid.create({
      data: {
        userId,
        chitId: installment.chitId,
        installmentId,
        bidAmount
      }
    });

    res.json(bid);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.declareWinner = async (req, res) => {
  try {
    const { installmentId } = req.body;

    const bids = await db.bid.findMany({
      where: { installmentId }
    });

    if (bids.length === 0) {
      return res.status(400).json({ message: "No bids found" });
    }

    // Lowest bid wins
    const winningBid = bids.reduce((min, b) =>
      b.bidAmount < min.bidAmount ? b : min
    );

    const installment = await db.installment.findUnique({
      where: { id: installmentId }
    });

    const chit = await db.chitGroup.findUnique({
      where: { id: installment.chitId }
    });

    // Get members
    const members = await db.chitMember.findMany({
      where: { chitId: chit.id }
    });

    const totalMembers = members.length;

    const payout = chit.totalAmount - winningBid.bidAmount;

    const dividend = winningBid.bidAmount / totalMembers;

    // Transaction (VERY IMPORTANT)
    const result = await db.$transaction(async (tx) => {

      // Save winner
      const winner = await tx.winner.create({
        data: {
          chitId: chit.id,
          installmentId,
          userId: winningBid.userId,
          winningBid: winningBid.bidAmount,
          payoutAmount: payout
        }
      });

      // Distribute profit
      for (const member of members) {
        await tx.ledger.create({
          data: {
            userId: member.userId,
            chitId: chit.id,
            installmentId,
            amount: dividend,
            type: "CREDIT"
          }
        });
      }

      // Update installment
      await tx.installment.update({
        where: { id: installmentId },
        data: { status: "COMPLETED" }
      });

      return winner;
    });

    await tx.ledger.create({
  data: {
    userId: winningBid.userId,
    chitId: chit.id,
    installmentId,
    amount: payout,
    type: "DEBIT"
  }
});

    res.json({
      winner: result,
      dividendPerUser: dividend
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getBids = async (req, res) => {
  try {
    const { installmentId } = req.params;

    const bids = await db.bid.findMany({
      where: { installmentId: Number(installmentId) },
      orderBy: { bidAmount: "asc" }
    });

    res.json(bids);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};