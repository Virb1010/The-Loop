module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Posts);
    User.hasMany(models.Comments);
  };

  return User;
};