import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresOn = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    await User.findOneAndUpdate(
      { email },
      { otp, expiresOn },
      { upsert: true, new: true }
    );
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"Todo App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your Todo App OTP',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
}

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    if (user.expiresOn < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
    // Clear OTP
    user.otp = null;
    user.expiresOn = null;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ message: 'OTP verified successfully', user, token });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
  }
}
