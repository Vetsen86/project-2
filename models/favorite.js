module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite");

    Favorite.associate = function(models) {
        models.User.belongsToMany(models.Game, { through: Favorite });
        models.Game.belongsToMany(models.User, { through: Favorite });
    };
    
    return Favorite;
  };