'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
      },
      year: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
      },
      genres: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }).then(() => {
      return queryInterface.addConstraint('history', [ 'book_id' ], {
        type: 'FOREIGN KEY',
        name: 'books',
        references: {
          table: 'books',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    }).then(() => {
      return queryInterface.addConstraint('history', [ 'user_id' ], {
        type: 'FOREIGN KEY',
        name: 'users',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('history', {})
  }
}
