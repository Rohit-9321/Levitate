import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    // Force all new users to be students
    const user = await User.create({ name, email, password, role: "student" });
    res.json({ user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, address: user.address, schoolName: user.schoolName } });
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
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, address: user.address, schoolName: user.schoolName } });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, schoolName, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password required to change password" });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      user.password = newPassword;
    }

    // Update all fields
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (schoolName !== undefined) user.schoolName = schoolName;
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }

    await user.save();
    
    res.json({ 
      message: "Profile updated successfully",
      user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, address: user.address, schoolName: user.schoolName } 
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
