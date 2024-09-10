const User = require('../Modules/UserModule');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const forgetPassword = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, "Ak$User", { expiresIn: "10m" });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akwebz25@gmail.com",
        pass: "pgka fknr awpw qjmg", // Ensure this is a valid app-specific password
      },
      tls: {
        rejectUnauthorized: false, // Accepts self-signed certificates
      }
    });

    // Email configuration
    const mailOptions = {
      from: "akwebz25@gmail.com",
      to: req.body.email,
      subject: "Reset Password",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="https://ak-solution-and-service.onrender.com/User/reset/${token}">Reset Password</a>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: "Failed to send email: " + err.message });
      }
      res.status(200).send({ message: "Reset email sent successfully" });
    });
  } catch (err) {
    res.status(500).send({ message: "Server error: " + err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(req.params.token, "Ak$User");

    // If the token is invalid or expired, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Find the user by the token's userId and update their password
    const user = await User.findOneAndUpdate(
      { _id: decodedToken.userId },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send success response after password reset
    res.status(200).send({ message: "Password reset successful" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: "Server error: " + err.message });
  }
};

module.exports = { forgetPassword, resetPassword };
