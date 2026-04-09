const bcrypt = require("bcrypt");
const prisma = require("@prisma/client").PrismaClient;
const { generateToken } = require("../../utils/jwt");

const db = new prisma();

exports.register = async (req, res) => {
  const { name, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { name, phone, password: hashed }
  });

  res.json({ token: generateToken(user) });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  const user = await db.user.findUnique({ where: { phone } });

  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  res.json({ token: generateToken(user) });
};