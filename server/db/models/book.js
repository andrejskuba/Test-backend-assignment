'use strict'
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    author_id: {
      type: DataTypes.INTEGER
    },
    year: {
      type: DataTypes.INTEGER
    },
    genres: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {})
  Book.associate = (models) => {
    models.book.belongsTo(models.author, {foreignKey: 'author_id', targetKey: 'id'})
  }
  return Book
}
