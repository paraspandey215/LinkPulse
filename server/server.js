
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const linksRouter = require("./routes/links");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(require("cookie-parser")());

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "linkpulse-local-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Local HTTP development only
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// API routes
app.use("/api/links", linksRouter);
app.use("/api/auth", authRouter);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to LinkPulse API!",
    status: "Backend is running successfully",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "LinkPulse API is healthy",
  });
});

// Short URL redirect
app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;

  console.log("Redirect requested:", shortCode);
  res.redirect(`/api/links/${shortCode}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`LinkPulse backend running at http://localhost:${PORT}`);
});
