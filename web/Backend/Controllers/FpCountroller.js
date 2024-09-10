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
      const token = jwt.sign({ userId: user._id }, "Ak$User", {expiresIn: "10m",});
  
      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "akwebz25@gmail.com",
          pass: "pgka fknr awpw qjmg",
        },tls: {
            rejectUnauthorized: false // Accepts self-signed certificates
        }
      });
  
      // Email configuration
      const mailOptions = {
        from: "akwebz25@gmail.com",
        to: req.body.email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="https://ak-solution-and-service.onrender.com/User/reset/${token}">https://ak-solution-and-service.onrender.com/User/reset/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  const resetPassword = async (req, res) => {
    try {
      // Verify the token sent by the user
      const decodedToken = jwt.verify(
        req.params.token,
        "Ak$User"
      );
      // If the token is invalid, return an error

      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
  
  
      // find the user with the id from the token
      const user = await User.findOneAndUpdate({ _id: decodedToken.userId },{password:req.body.newPassword},{new:true});
      
      if (!user) {
        return res.status(401).send({ message: "no user found" });
      }
      
      // Hash the new password
      // Update user's password, clear reset token and expiration time
      // Send success response
      res.status(200).send(user);
    } catch (err) {
      // Send error response if any error occurs
      res.status(500).send({ message: err.message });
    }
  };
module.exports={forgetPassword,resetPassword}