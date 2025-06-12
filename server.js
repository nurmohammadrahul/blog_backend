import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
const corsOptions = {
  origin: ["http://localhost:5173", "https://nursblog.vercel.app", "https://blog-frontend-rust-six.vercel.app/"], // allow only these origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you want to allow cookies/auth headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
