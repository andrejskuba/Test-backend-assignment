'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  })
  User.associate = (models) => {
    // associations can be defined here
  }
  return User
}
