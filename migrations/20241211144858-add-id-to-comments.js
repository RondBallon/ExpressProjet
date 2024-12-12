'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.addColumn("Comments", "id", {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  });
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn("Comments", "id");
},
};
