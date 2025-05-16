const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Create tables if they don't exist
sequelize.sync().then(() => console.log("SQLite DB synced"));

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add user" });
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
