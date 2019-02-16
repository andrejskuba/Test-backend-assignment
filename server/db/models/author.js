module.exports = function(sequelize, DataTypes) {
  const Author = sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: false,
  })
  Author.associate = (models) => {
    models.author.hasMany(models.book, {foreignKey: 'author_id', sourceKey: 'id'})
  }
  return Author
}
