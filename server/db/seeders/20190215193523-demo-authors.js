'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('authors', [{
      id: 1,
      name: 'Jack',
      last_name: 'London'
    },
    {
      id: 2,
      name: 'Ernest',
      last_name: 'Hemingway'
    },
    {
      id: 3,
      name: 'Franz',
      last_name: 'Kafka'
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('authors', null, {})
  }
}
