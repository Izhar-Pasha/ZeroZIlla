import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();
    res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    console.error("failed to register:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password)
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });

    const verifyUser = await User.findOne({ name });
    if (!verifyUser) return res.status(404).json({ message: "User not found" });

    const verifyPassword = await bcrypt.compare(password, verifyUser.password);

    if (!verifyPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const payload = {
      id: verifyUser._id,
      name: verifyUser.name,
      email: verifyUser.email,
    };

    console.log("payload:", payload);
    const secret = process.env.SEC;

    const options = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, secret, options);
    res.status(200).json({ token });
  } catch (error) {
    console.error("failed to login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authentication = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing!" });
    }

    const secret = process.env.SEC || "defaultSecret";

    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Failed to verify token:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
