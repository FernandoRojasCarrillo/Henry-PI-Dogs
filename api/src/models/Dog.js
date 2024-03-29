const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Dog', 
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
        defaultValue: false
      },
      dog_created: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  );
};
