'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt')
    const passHash = bcrypt.hashSync('admin', 10);
    return queryInterface.bulkInsert('users', [{
      email: 'admin@test.com',
      password: passHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
