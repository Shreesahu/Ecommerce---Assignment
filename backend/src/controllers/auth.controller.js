import prisma from "../db/prisma.js";
import { verifyTokenService } from "../services/auth.service.js";
import jwtTokenGenerator from "../utils/jwtTokenGenerator.js";


export const autoLoginController = async (req, res) => {

  return res.status(200).json({
    user: req.dbUser,
  });

};


export const loginController = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    const decoded = await verifyTokenService(token);
    const mobile = decoded.phone_number;

    const user = await prisma.user.findUnique({
      where: { mobile },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not registered. Please sign up first.",
      });
    }

    const jwtToken = jwtTokenGenerator(user);

    return res.status(200).json({
      message: "Login successful",
      user,
      token: jwtToken,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};

export const signupController = async (req, res) => {
  try {
    const { token, fullName } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const decoded = await verifyTokenService(token);
    const mobile = decoded.phone_number;

    const existingUser = await prisma.user.findUnique({
      where: { mobile },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists. Please login.",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        mobile,
        fullName,
      },
    });

    const jwtToken = jwtTokenGenerator(newUser);

    return res.status(201).json({
      message: "Signup successful",
      user: newUser,
      token: jwtToken,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};
