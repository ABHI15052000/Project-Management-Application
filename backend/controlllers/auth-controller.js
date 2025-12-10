import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Verification from "../models/verification.js";
import { sendEmail } from "../libs/send-email.js";
import aj from "../libs/arcjet.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const decision = await aj.protect(req, { email });
    // console.log("Arcjet decision", decision.isDenied());

    if (decision.isDenied()) {
      return res.status(403).json({ message: "Invalid email address" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const verificationToken = jwt.sign(
      { userId: newUser._id, purpose: "email-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await Verification.create({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailbody = `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`;
    const emailSubject = "Verify your email address";

    const isEmailSent = await sendEmail(email, emailSubject, emailbody);

    if (!isEmailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    return res.status(201).json({
      message:
        "Verification email sent to your email. Please check and verify your account",
    });
  } catch (error) {
    console.log("Error while registering the user AUTH");
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, purpose } = payload;

    if (!payload || purpose !== "email-verification") {
      return res.status(401).json({ message: "Unauthorised " });
    }

    const verification = await Verification.findOne({ userId, token });

    if (!verification) {
      return res.status(401).json({ message: "Unauthorised " });
    }
    const isTokenExpired = verification.expiresAt < new Date();

    if (isTokenExpired) {
      return res.status(401).json({ message: "Token has expired" });
    }

    const user = User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorised " });
    }

    user.isVerified = true;
    await user.save();

    await Verification.findByIdAndDelete(verification._id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser, verifyEmail };
