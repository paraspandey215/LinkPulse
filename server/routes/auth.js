
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [cleanName, cleanEmail, passwordHash]
    );

    req.session.userId = result.insertId;

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: result.insertId,
        name: cleanName,
        email: cleanEmail,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      message: "Could not create account",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const [users] = await pool.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (
      users.length === 0 ||
      !(await bcrypt.compare(password, users[0].password_hash))
    ) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    req.session.userId = users[0].id;

    return res.json({
      message: "Login successful",
      user: {
        id: users[0].id,
        name: users[0].name,
        email: users[0].email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Could not log in",
    });
  }
});

// CURRENT USER
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const [users] = await pool.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [req.session.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.json({ user: users[0] });
  } catch (error) {
    console.error("Session check error:", error.message);
    return res.status(500).json({
      message: "Could not verify session",
    });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Could not log out",
      });
    }

    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
