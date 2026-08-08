import passport from "passport";
import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  googleCallback,
  verifyEmail,
} from "../controllers/auth.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticateToken, getMe);
router.post("/verify-email", verifyEmail);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  googleCallback,
);

export default router;
