const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      index: true,
    },

    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      set(value) {
        this.setDataValue('nombre', value.toLowerCase());
      }
    },

    imagen: {
      type: DataTypes.STRING,
    },

    vida: {
      type: DataTypes.INTEGER,
    },

    fuerza: {
      type: DataTypes.INTEGER,
    },

    defensa: {
      type: DataTypes.INTEGER,
    },

    s_fuerza: {
      type: DataTypes.INTEGER,
    },

    s_defensa: {
      type: DataTypes.INTEGER,
    },

    velocidad: {
      type: DataTypes.INTEGER,
    },

    altura: {
      type: DataTypes.FLOAT,
    },

    peso: {
      type: DataTypes.FLOAT,
    },
  }, 
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
