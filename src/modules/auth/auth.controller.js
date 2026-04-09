const bcrypt = require("bcrypt");
const prisma = require("@prisma/client").PrismaClient;
const { generateToken } = require("../../utils/jwt");
const jwt = require("jsonwebtoken");

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

  const user = await db.user.findUnique({
    where: { phone }
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

exports.getMe = async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        phone: true
      }
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};