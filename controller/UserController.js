const db = require("../models");
const userRepository = db.user;

exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }

    if (!req.body.nickname) {
        res.status(400).send({
            message: "Nickname can not be empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "Password can not be empty!"
        });
        return;
    }

    const newUser = {
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        createDate: Date.now()
    };

    userRepository.create(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err)
        });
}

exports.findAll = (req, res) => {
    userRepository.findAll({raw: true, nest: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    userRepository.findOne({where: {userId: id}, raw: true, nest: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        })
}

exports.changePassword = (req, res) => {
    const userId = req.body.userId;
    const newPassword = req.body.password

    userRepository.update({password: newPassword}, {where: {userId: userId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${userId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    userRepository.destroy({where: {userId: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}
