const {INTEGER, DATE} = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
            userId: {
                field: 'user_id',
                type: INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            email: {field: 'email', type: DataTypes.STRING, unique: true, allowNull: false},
            nickname: {field: 'nickname', type: DataTypes.STRING, unique: true, allowNull: false},
            password: {field: 'password', type: DataTypes.STRING, allowNull: false},
            createDate: {field: 'create_date', type: DATE, default: Date.now()}
        },
        {timestamps: false},
        {
            sequelize,
            modelName: 'user',
            freezeTableName: true,
            tableName: 'user',
        }
    );
    return user;
};