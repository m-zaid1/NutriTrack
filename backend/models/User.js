// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },

  currentWeight: { type: DataTypes.FLOAT, allowNull: true },  // Current weight of the user
  goalWeight: { type: DataTypes.FLOAT, allowNull: true },  // Current weight of the user
  goal: { type: DataTypes.STRING, allowNull: true },          // User's fitness or health goal
  height: { type: DataTypes.FLOAT, allowNull: true },         // Height of the user
  gender: { type: DataTypes.STRING, allowNull: true },        // Gender of the user
  dateOfBirth: { type: DataTypes.DATE, allowNull: true },     // User's date of birth
  firstLogin: { type: DataTypes.BOOLEAN, defaultValue: true }, // New column for first login
});

export default User;
