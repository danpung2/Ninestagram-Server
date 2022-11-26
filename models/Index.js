const config = require("../config/DatabaseConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.user = require("./User")(sequelize, Sequelize);

db.article = require("./Article")(sequelize, Sequelize);

db.comment = require("./Comment")(sequelize, Sequelize);
db.reply = require("./Reply")(sequelize, Sequelize);
db.followerList = require("./FollowerList")(sequelize, Sequelize);
db.followingList = require("./FollowingList")(sequelize, Sequelize);
db.banList = require("./BanList")(sequelize, Sequelize);

db.user.hasMany(db.article, {
    foreignKey: 'fk_userId',
    onDelete: 'cascade'
});
db.user.hasMany(db.comment, {
    foreignKey: 'fk_userId',
    onDelete: 'cascade'
});
db.user.hasOne(db.banList, {
    foreignKey: 'fk_userId',
    onDelete: 'cascade'
});
db.user.hasOne(db.followerList, {
    foreignKey: 'fk_userId',
    onDelete: 'cascade'
});
db.user.hasOne(db.followingList, {
    foreignKey: 'fk_userId',
    onDelete: 'cascade'
});
db.article.hasMany(db.comment, {
    foreignKey: 'fk_articleId',
    onDelete: 'cascade'
});
db.article.hasMany(db.reply, {
    foreignKey: 'fk_articleId',
    onDelete: 'cascade'
});
db.comment.hasMany(db.reply, {
    foreignKey: 'fk_commentId',
    onDelete: 'cascade'
});

module.exports = db;