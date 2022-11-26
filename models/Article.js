const {INTEGER, DATE} = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const article = sequelize.define('article', {
            articleId: {
                field: 'article_id',
                type: INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            userId: {field: 'user_id', type: INTEGER, foreignKey: true, allowNull: false},
            content: {field: 'content', type: DataTypes.STRING, unique: true, allowNull: false},
            likeCount: {field: 'like_count', type: INTEGER, allowNull: false, default: 0},
            createDate: {field: 'create_date', type: DATE, default: Date.now()}
        },
        {timestamps: false},
        {
            sequelize,
            modelName: 'article',
            freezeTableName: true,
            tableName: 'article'
        }
    );
    return article;
};