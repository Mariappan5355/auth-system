'use strict';

const bcrypt = require("bcrypt");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password',10),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'User',
        email: 'user@example.com',
        password: bcrypt.hashSync('password',10),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
