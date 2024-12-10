const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import de la configuration Sequelize

const User = sequelize.define('User', {
  // Définitions des colonnes
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.TEXT(255),
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },  
}, {
  // Options du modèle
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
