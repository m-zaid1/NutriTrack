import { Sequelize } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.addColumn('Users', 'firstLogin', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'firstLogin');
  }
};