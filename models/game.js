module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Game.associate = function(models) {
    Game.hasMany(models.Retailer);
  };
  
  return Game;
};
