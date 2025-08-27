import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();
await connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // fallback if .env not set
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight requests (OPTIONS)
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());

// ✅ Serve uploaded notes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/tests", testRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
