const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videos', {
    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM("Frontend", "Backend", "Others"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documentation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdForUser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      
    },
  }, { timestamps: false });
};