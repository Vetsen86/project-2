module.exports = function(sequelize, DataTypes) {
    var Retailer = sequelize.define("Retailer", {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      expiresAt: DataTypes.DATEONLY
    });

    Retailer.associate = function(models) {
      Retailer.belongsTo(models.Game, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Retailer;
  };