import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

export default app;
