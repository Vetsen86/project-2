module.exports = function(sequelize, DataTypes) {
    var Platform = sequelize.define("Platform", {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT
    });

    Platform.associate = function(models) {
      Platform.belongsTo(models.Retailer, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Platform;
  };