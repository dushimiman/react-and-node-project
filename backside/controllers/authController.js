const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary

const register = async (req, res) => {
  try {
    const { username, password, role, branch } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hash_password = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      hash_password,
      role,
      branch
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.hash_password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role, branch: user.branch },
      'your_jwt_secret', // Replace with your actual secret
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  register,
  login
};
