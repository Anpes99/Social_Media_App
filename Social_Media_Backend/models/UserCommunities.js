const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class UserCommunities extends Model {}

UserCommunities.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "communitys", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "userCommunities",
  }
);

module.exports = UserCommunities;
