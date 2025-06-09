module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM,
            values: [
                'Opinion Piece',
                'Research Paper',
                'Concept Explanation',
                'Project Log',
                'Other'
            ],
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Posts;
};