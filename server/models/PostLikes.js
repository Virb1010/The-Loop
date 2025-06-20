module.exports = (sequelize, DataTypes) => {
  const PostLikes = sequelize.define("PostLikes", {
    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  PostLikes.associate = (models) => {
    PostLikes.belongsTo(models.User);
    PostLikes.belongsTo(models.Posts);
  };

  return PostLikes;
};
