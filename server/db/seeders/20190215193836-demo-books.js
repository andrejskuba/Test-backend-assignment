'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [{
      id: 1,
      title: 'The Call of the Wild',
      author_id: 1,
      year: 1903,
      genres: 'genre1, genre2',
      rating: 955,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'The Old Man and the Sea',
      author_id: 2,
      year: 1951,
      genres: 'genre2, genre3',
      rating: 912,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: 'Betrachtung',
      author_id: 3,
      year: 1912,
      genres: 'genre4',
      rating: 875,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {})
  }
}
