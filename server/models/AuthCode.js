module.exports = (sequelize, DataTypes) => {
  const AuthCode = sequelize.define("AuthCode", {
    email: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
  });

  return AuthCode;
};