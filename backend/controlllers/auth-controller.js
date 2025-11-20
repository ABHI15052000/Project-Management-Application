import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered!" });
    }
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
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

export { registerUser, loginUser };
