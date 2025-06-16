const express = require("express");
const router = express.Router();
const { User, AuthCode } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        secure: false,
        port: 587
    },
});

router.post("/sendOTP", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({ error: "Email already registered" });

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await AuthCode.create({ email, code, expiresAt, used: false });

        await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "The Loop: Your OTP Code",
        text: `Welcome to The Loop! Your verification code is ${code}. It expires in 5 minutes. If you did not request a verification code, you may disregard this message. Please do not reply to this email.`,
        });
        res.json({ status: "OTP_SENT" });

    } catch (err) {
        console.error("sendOTP ERROR:", err);
        res.status(500).json({ error: err.message || err });
    }
});


router.post("/verifyOTP", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  const record = await AuthCode.findOne({ where: { email, code, used: false } });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: "Invalid or expired code" });
  }

  record.used = true;
  await record.save();
  res.json({ status: "OTP_VERIFIED" });
});


router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const verified = await AuthCode.findOne({ where: { email, used: true } });
  if (!verified) {
    return res.status(403).json({ error: "Email not verified" });
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, firstName, lastName });
  res.json({ status: "USER_CREATED", userId: user.id });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
});

module.exports = router;
