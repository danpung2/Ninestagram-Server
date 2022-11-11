const {INTEGER, DATE} = require("sequelize");

module.exports = function (sequelize) {
    const followingList = sequelize.define('following_list', {
            followingListId: {
                field: 'following_list_id',
                type: INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            userId: {field: 'user_id', type: INTEGER, allowNull: false},
            followingUserId: {field: 'following_user_id', type: INTEGER, allowNull: false},
            createDate: {field: 'create_date', type: DATE, default: Date.now()}
        },
        {timestamps: false},
        {
            sequelize,
            modelName: 'followingList',
            freezeTableName: true,
            tableName: 'followingList'
        }
    );
    return followingList;
};