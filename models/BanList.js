const {INTEGER, DATE} = require("sequelize");

module.exports = function (sequelize) {
    const banList = sequelize.define('ban_list', {
            banListId: {
                field: 'ban_list_id',
                type: INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            userId: {field: 'user_id', type: INTEGER, allowNull: false},
            banUserId: {field: 'ban_user_id', type: INTEGER, allowNull: false},
            createDate: {field: 'create_date', type: DATE, default: Date.now()}
        },
        {timestamps: false},
        {
            sequelize,
            modelName: 'banList',
            freezeTableName: true,
            tableName: 'banList'
        }
    );
    return banList;
};