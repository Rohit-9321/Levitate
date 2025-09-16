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
const allowedOrigins = [
  "http://localhost:5173",
  "https://levitate-frontend.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
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
