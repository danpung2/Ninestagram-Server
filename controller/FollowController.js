const db = require("../models");
const followerListRepository = db.followerList;
const followingListRepository = db.followingList;

exports.create = (req, res) => {
    const newFollowing = {
        userId: req.body.userId,
        followingUserId: req.body.followingUserId,
        createDate: Date.now()
    }

    const newFollower = {
        userId: req.body.followingUserId,
        followerUserId: req.body.userId,
        createDate: Date.now()
    }

    followingListRepository.create(newFollowing)
        .then()
        .catch(err => {
            console.error(err)
        });
    followerListRepository.create(newFollower)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err)
        });
}

exports.findAllFollower = (req, res) => {
    const userId = req.params.userId;
    followerListRepository.findAll({raw: true, nest: true, where: {userId: userId}, order: [['create_date', 'ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.findAllFollowing = (req, res) => {
    const userId = req.params.userId;
    followingListRepository.findAll({raw: true, nest: true, where: {userId: userId}, order: [['create_date', 'DESC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.deleteFollowing = (req, res) => {
    const userId = req.body.userId;
    const followingUserId = req.body.followingUserId;

    followingListRepository.destroy({where: {userId: userId, followingUserId: followingUserId}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        })
}
