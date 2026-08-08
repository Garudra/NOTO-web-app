import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import transporter from "../config/mailer.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const otp = generateOTP();

    const newUser = new User({
      name,
      email,
      password,
      profilePicture: req.file?.path || "",

      isVerified: false,

      emailVerificationOTP: otp,

      emailVerificationOTPExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newUser.save();

    const { data, error } = await transporter.emails.send({
      from: "Noto <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your Noto account",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          background: #111;
          color: white;
          border-radius: 12px;
        ">
          <h2>Welcome to Noto 👋</h2>
    
          <p>
            Thanks for creating your account.
            Use the OTP below to verify your email address.
          </p>
    
          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            background: #222;
            border-radius: 8px;
          ">
            ${otp}
          </div>
    
          <p style="color: #999;">
            This OTP will expire in 10 minutes.
          </p>
    
          <p>
            If you didn't create a Noto account, you can ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("EMAIL ERROR:", error);
      return res.status(500).json({
        message: "Failed to send verification email",
      });
    }

    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    if (!user.emailVerificationOTP || !user.emailVerificationOTPExpires) {
      return res.status(400).json({
        message: "Verification OTP not found",
      });
    }

    if (user.emailVerificationOTPExpires < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    if (user.emailVerificationOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;

    user.emailVerificationOTP = undefined;
    user.emailVerificationOTPExpires = undefined;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    return res.status(500).json({
      message: "Error verifying email",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!existingUser.password) {
      return res.status(400).json({
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    if (!existingUser.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in, please try again later",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

export const googleCallback = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    res.status(500).json({
      message: "Google authentication failed",
    });
  }
};
