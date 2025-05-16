// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const NewsletterSubscription = sequelize.define('NewsletterSubscription', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default NewsletterSubscription;