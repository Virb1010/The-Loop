module.exports = (sequelize, DataTypes) => {
  const CommentLikes = sequelize.define("CommentLikes", {
    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  CommentLikes.associate = (models) => {
    CommentLikes.belongsTo(models.User);
    CommentLikes.belongsTo(models.Comments);
  };

  return CommentLikes;
};
