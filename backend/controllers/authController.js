import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password, role });
    res.json({ user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
