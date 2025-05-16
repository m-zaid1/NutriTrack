export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'goalWeight', {
    type: Sequelize.FLOAT,
    allowNull: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'goalWeight');
}