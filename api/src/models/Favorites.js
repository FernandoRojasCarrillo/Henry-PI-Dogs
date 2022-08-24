const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Favorites',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
      },
      breed_group: {
        type: DataTypes.STRING,
      },
      temperaments: {
        type: DataTypes.STRING,
      },
      fav_button: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }
  )
}