'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
        'tb_usuario',
        'foto_path',
        {
            type: Sequelize.STRING(255),
            allowNull:true   
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('tb_usuario', 'foto_path')
  }
};
