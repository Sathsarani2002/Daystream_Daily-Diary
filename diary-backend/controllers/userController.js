const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashed });
  await newUser.save();
  res.json({ message: 'User registered successfully' });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid password' });

  // ✅ Include user name in response
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({
    message: 'Login successful',
    token,
    name: user.name, // <-- Added this
  });
};

// ✅ Get Logged-in User Info
exports.getUserProfile = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('name email');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
