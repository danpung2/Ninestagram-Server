const {INTEGER, DATE} = require("sequelize");

module.exports = function (sequelize) {
    const followerList = sequelize.define('follower_list', {
            followerListId: {
                field: 'follower_list_id',
                type: INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            userId: {field: 'user_id', type: INTEGER, allowNull: false},
            followerUserId: {field: 'follower_user_id', type: INTEGER, allowNull: false},
            createDate: {field: 'create_date', type: DATE, default: Date.now()}
        },
        {timestamps: false},
        {
            sequelize,
            modelName: 'followerList',
            freezeTableName: true,
            tableName: 'followerList'
        }
    );
    return followerList;
};