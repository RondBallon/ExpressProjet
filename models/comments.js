<<<<<<< HEAD
"use strict";
const { Model } = require("sequelize");
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");
/* const { primaryKey } = require("../sequelize"); */
//module.exports = (sequelize, DataTypes) => {
class Comments extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  //static associate(models) {
  // define association here
  //}
}
Comments.init(
  {
    /*    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    }, */
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    }, // Permet des valeurs nulles pour user_id
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: true, // Permet des valeurs nulles pour post_id
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false, // Le contenu est tjs requis
    },
  },
  {
    sequelize,
    modelName: "Comments",
  }
);
//return Comments;
//};
module.exports = Comments;
=======
'use strict';
const {Model} = require('sequelize');
const sequelize =require('../sequelize');
const {DataTypes} = require('sequelize');
//module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init({
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
  }, // Permet des valeurs nulles pour user_id
    post_id:{ 
      type:DataTypes.BIGINT,
      allowNull: true, // Permet des valeurs nulles pour post_id
  },  
    content:{
        type:DataTypes.STRING,
        allowNull: false, // Le contenu est tjs requis
  },  
  }, {
    sequelize,
    modelName: 'Comments',
  });
  //return Comments;
//};
module.exports = Comments;
<<<<<<< HEAD
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
=======
>>>>>>> 3378dac (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
>>>>>>> 685c5bc (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
