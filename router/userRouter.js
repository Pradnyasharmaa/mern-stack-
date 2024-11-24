import express from "express";
import { register, login, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Test route to confirm the router is working
router.get("/test", (req, res) => {
    res.send("Test route is working!");
  });

// Register route
router.get("/register", register);  // This is your registration route
router.get("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;
