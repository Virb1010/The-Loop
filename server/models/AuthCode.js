module.exports = (sequelize, DataTypes) => {
  const Verification = sequelize.define("Verification", {
    email: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    codeHash: {
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

  return Verification;
};