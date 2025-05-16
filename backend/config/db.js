// config/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // or a path like './data/db.sqlite'
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('✅ SQLite connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

export default sequelize;
