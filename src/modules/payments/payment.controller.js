const {
    PrismaClient
} = require("@prisma/client");
const db = new PrismaClient();

exports.payInstallment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            installmentId
        } = req.body;

        // Get installment
        const installment = await db.installment.findUnique({
            where: {
                id: installmentId
            }
        });

        if (!installment) {
            return res.status(404).json({
                message: "Installment not found"
            });
        }

        // Check chit
        const chit = await db.chitGroup.findUnique({
            where: {
                id: installment.chitId
            }
        });

        // Check if already paid
        const existing = await db.payment.findUnique({
            where: {
                userId_installmentId: {
                    userId,
                    installmentId
                }
            }
        });

        if (existing) {
            return res.status(400).json({
                message: "Already paid for this installment"
            });
        }

        // Create payment (transaction safe)
        const payment = await db.$transaction(async (tx) => {
            return await tx.payment.create({
                data: {
                    userId,
                    chitId: chit.id,
                    installmentId,
                    amount: chit.monthlyAmount
                }
            });
        });

        await tx.ledger.create({
            data: {
                userId,
                chitId: chit.id,
                installmentId,
                amount: chit.monthlyAmount,
                type: "DEBIT"
            }
        });

        res.json(payment);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getMyPayments = async (req, res) => {
    try {
        const userId = req.user.id;

        const payments = await db.payment.findMany({
            where: {
                userId
            },
            include: {
                installment: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(payments);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};