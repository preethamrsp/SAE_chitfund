const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

// Add member to chit
exports.addMember = async (req, res) => {
  try {
    const { chitId, userId } = req.body;

    // Check chit exists
    const chit = await db.chitGroup.findUnique({
      where: { id: chitId }
    });

    if (!chit) {
      return res.status(404).json({ message: "Chit not found" });
    }

    // Count existing members
    const count = await db.chitMember.count({
      where: { chitId }
    });

    if (count >= chit.durationMonths) {
      return res.status(400).json({
        message: "Chit is already full"
      });
    }

    // Check duplicate user
    const existing = await db.chitMember.findFirst({
      where: { chitId, userId }
    });

    if (existing) {
      return res.status(400).json({
        message: "User already in chit"
      });
    }

    // Assign position
    const position = count + 1;

    const member = await db.chitMember.create({
      data: {
        chitId,
        userId,
        position
      }
    });

    res.json(member);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};