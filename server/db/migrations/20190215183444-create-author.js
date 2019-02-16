'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('authors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }).then(() => {
      return queryInterface.addColumn('books', 'author_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        after: 'title'
      })
    }).then(() => {
      return queryInterface.addConstraint('books', [ 'author_id' ], {
        type: 'FOREIGN KEY',
        name: 'author',
        references: {
          table: 'authors',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('books', 'author').then(() => {
      return queryInterface.removeColumn('books', 'author_id')
    }).then(() => {
      return queryInterface.dropTable('author', {})
    })
  }
}
