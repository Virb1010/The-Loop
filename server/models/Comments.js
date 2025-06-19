module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        content: {
        type: DataTypes.TEXT,
        allowNull: false
        },

        likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
        },

        dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
        },

        createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        }
    });

  Comments.associate = (models) => {
    Comments.belongsTo(models.User); 
    Comments.belongsTo(models.Posts);
  };

  return Comments;
};
