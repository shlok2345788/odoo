// signup.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Signup successful', token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;