import prisma from "../db/prisma.js";

const userInDBChecker = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.dbUser = user;

    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export default userInDBChecker;