const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// User Registration (No bcrypt)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Convert email to lowercase before saving (to avoid duplicates)
    const lowerCaseEmail = email.toLowerCase();

    let user = await User.findOne({ email: lowerCaseEmail });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Save the user with the original password (case-sensitive)
    user = new User({
      name,
      email: lowerCaseEmail, // Save email in lowercase
      password, // Store password as it is (case-sensitive)
      role
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// User Login (No bcrypt, Case-Insensitive Email)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Convert email to lowercase before checking in the database
    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords (case-sensitive)
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
