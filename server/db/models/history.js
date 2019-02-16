'use strict';
module.exports = (sequelize, DataTypes) => {

  const history = sequelize.define('history', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    book_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NULL
    },
    author_id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.NULL
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.NULL
    },
    genres: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NULL
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.NULL
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    freezeTableName: true,
  })
  history.associate = (models) => {
    // associations can be defined here
    // models.book.belongsTo(models.book, {foreignKey: 'book_id', targetKey: 'id'})
    // models.book.belongsTo(models.author, {foreignKey: 'author_id', targetKey: 'id'})
    // models.book.belongsTo(models.user, {foreignKey: 'user_id', targetKey: 'id'})
  }
  return history
}
