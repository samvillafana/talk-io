const seedUsers = require('./seedsUsers');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- Database Synched -----\n');

  await seedUsers();
  console.log('\n----- Users Seeded -----\n');

  process.exit(0);
};

seedAll();