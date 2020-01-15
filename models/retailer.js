module.exports = function(sequelize, DataTypes) {
    var Retailer = sequelize.define("Retailer", {
      name: DataTypes.STRING
    });

    Retailer.associate = function(models) {
      Retailer.belongsTo(models.Game, {
        foreignKey: {
          allowNull: false
        }
      });
      Retailer.hasMany(models.Platform);
    };

    return Retailer;
  };