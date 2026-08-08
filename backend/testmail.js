import "dotenv/config";
import nodemailer from "nodemailer";

console.log("USER:", process.env.EMAIL_USER);
console.log("PASSWORD:", process.env.EMAIL_PASSWORD ? "LOADED" : "MISSING");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

try {
  await transporter.verify();
  console.log("✅ GMAIL AUTHENTICATION SUCCESSFUL");
} catch (error) {
  console.log("❌ GMAIL AUTHENTICATION FAILED");
  console.log(error);
}