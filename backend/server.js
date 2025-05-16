import express from 'express';
import cors from 'cors';
import session from 'express-session';  // Import express-session
import { connectDB } from './config/db.js';
import sequelize from './config/db.js'; // Needed for syncing models
import User from './models/User.js';
import router from './routes/users.js'; // Your updated user routes


// Allow requests from the frontend URL
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies and credentials
};


const app = express();

app.use(express.json());
app.use(cors(corsOptions));  // Apply CORS middleware to your app


// Use the routes from the `users.js` file
app.use('/api/users', router);  // All /api/users routes are handled by `router` (your updated routes)

app.use('/api/user', router);  // Alias for backward compatibility if needed

// Connect to the database
await connectDB();

// Sync Sequelize models (if needed for migrations, otherwise comment out)
await sequelize.sync();

// If you still need a custom route to create users manually:
app.post('/api/users', async (req, res) => {
  try {
    console.log("➡️ Incoming sign-up data:", req.body);  // Log incoming data

    const user = await User.create(req.body);             // Try to insert into DB
    res.status(201).json({ success: true, user });         // Respond with success

  } catch (err) {
    console.error("❌ Error creating user:", err);         // Log the actual Sequelize error
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// If you want to access the list of users directly (for debugging or admin purposes)
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
