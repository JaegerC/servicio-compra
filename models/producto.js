'use strict';
const {
  Model,
  INTEGER,
  STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.hasMany(models.compra);
    }
  };
  Producto.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER
    },
    nombre: {
      type: STRING,
      allowNull: true
    },
    precio: {
      type: INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'producto',
    timestamps: false
  });
  return Producto;
};