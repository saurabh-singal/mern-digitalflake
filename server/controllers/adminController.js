const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const nodemailer = require("nodemailer");

dotenv.config();

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    res.status(400);
    throw new Error("Admin already register");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    email,
    password: hashedPassword,
  });
  if (admin) {
    res.status(201).json({ _id: admin.id, email: admin.email });
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
  res.json({ message: "Register the admin" });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          email: admin.email,
          id: admin.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  res.json({ message: "Login admin" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const admin = await Admin.findOne({ email });

  if (admin) {
    const secret = process.env.ACCESS_TOKEN_SECRET + admin.password;
    const accessToken = jwt.sign(
      {
        admin: {
          email: admin.email,
          id: admin.id,
        },
      },
      secret,
      { expiresIn: "5m" }
    );
    const link = `http://localhost:5000/api/admin/reset-password/${admin.id}/${accessToken}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "saurabhsingal08@gmail.com",
        pass: "cwmi fyku ybio wiaq",
      },
    });

    var mailOptions = {
      from: process.env.AUTHER_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Password reset link",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email not valid");
  }
  res.json({ message: "Login admin" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.json({ status: "Email not exist" });
  }
  const secret = process.env.ACCESS_TOKEN_SECRET + admin.password;
  try {
    const verify = jwt.verify(token, secret);
    res.send("verified");
  } catch (error) {
    res.send("Not verified");
  }
});

module.exports = { registerAdmin, loginAdmin, forgotPassword, resetPassword };
