// routes/users.js
import express from 'express';
import User from '../models/User.js';
import NewsletterSubscription from '../models/newsletter.js';  // Correct ES Module import

const router = express.Router();



router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Validate email (simple validation)
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  try {
    // Check if the email already exists in the database
    const existingSubscription = await NewsletterSubscription.findOne({ where: { email } });
    if (existingSubscription) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    // Save new email to the database
    const newSubscription = await NewsletterSubscription.create({ email });
    return res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get('/profile', async (req, res) => {
  const userId = req.query.userId; // or req.headers.userid

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name, 
        email: user.email,
        gender: user.gender,
        goalWeight: user.goalWeight,
        dateOfBirth: user.dateOfBirth,
        height: user.height,
        currentWeight: user.currentWeight,
      }
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Update user (details)
router.post('/update-profile', async (req, res) => {
  const { userId, name, dateOfBirth, gender, currentWeight, goalWeight, height, goal } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields
    user.name = name;
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;
    user.currentWeight = currentWeight;
    user.goalWeight = goalWeight;
    user.height = height;
    user.goalWeight = goalWeight;

    await user.save();

    res.json({ success: true, message: "User profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



router.post("/updateGoal", async (req, res) => {
  const { userId, goal } = req.body;

  if (!userId || !goal) {
    return res.status(400).json({ success: false, message: "User ID and goal are required" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.goal = goal;
    await user.save();

    res.json({ success: true, message: "Goal updated successfully" });
  } catch (error) {
    console.error("Update goal error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Register user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });
    res.json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Directly compare the passwords (no hashing for simplicity)
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Check if it's the user's first login
    if (user.firstLogin) {
      // Update the firstLogin flag to false after first successful login
      user.firstLogin = false;
      await user.save();

      // Respond indicating it's the user's first login
      return res.json({
        success: true,
        message: "First login successful",
        firstLogin: true,
        userId: user.id,
      });
    }

    // Normal login response
    res.json({
      success: true,
      message: "Login successful",
      firstLogin: false,
      userId: user.id,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all users (optional)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to retrieve users' });
  }
});

export default router;
