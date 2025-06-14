module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING, 
        unique: true, 
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
  };

  return User;
};