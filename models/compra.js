'use strict';
const {
  Model,
  INTEGER,
  FLOAT,
  STRING,
  DATEONLY
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compra.belongsTo(models.producto);
    }
  };
  Compra.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER
    },
    descripcion: {
      type: STRING,
      allowNull: true
    },
    cantidad: {
      type: INTEGER,
      allowNull: true
    },
    total: {
      type: FLOAT,
      allowNull: true
    },
    fecha: {
      type: DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'compra',
    timestamps: false
  });
  return Compra;
};