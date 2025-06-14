const express = require("express");
const router = express.Router();
const { User, VerificationCode } = require("../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
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

        await VerificationCode.create({ email, code, expiresAt, used: false });

        await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "The Loop: Your OTP Code",
        text: `Welcome to The Loop! Your verification code is ${code}. It expires in 5 minutes.`,
        });
        res.json({ status: "OTP_SENT" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

module.exports = router;
