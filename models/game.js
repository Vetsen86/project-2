module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: DataTypes.STRING
  });
  return Game;
};
