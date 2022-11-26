const {INTEGER, DATE} = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const comment = sequelize.define('comment', {
            commentId: {
                field: 'comment_id',
                type: INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            userId: {field: 'user_id', type: INTEGER, foreignKey: true, allowNull: false},
            articleId: {field: 'article_id', type: INTEGER, foreignKey: true, allowNull: false},
            content: {field: 'content', type: DataTypes.STRING, allowNull: false},
            createDate: {field: 'create_date', type: DATE, default: Date.now()}
        },
        {timestamps: false},
        {
            sequelize,
            modelName: 'comment',
            freezeTableName: true,
            tableName: 'comment'
        }
    );

    return comment;
};