import express from "express";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controller/user.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/profile", isLoggedIn, getProfile);
router.get("/logout", isLoggedIn, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
