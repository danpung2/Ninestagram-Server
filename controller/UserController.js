const crypto = require("crypto");

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

    const createHashedPassword = crypto.createHash("sha512").update(req.body.password).digest("base64");

    const newUser = {
        email: req.body.email,
        nickname: req.body.nickname,
        password: createHashedPassword,
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
        });
}

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userRepository.findOne({where: {email: email}, raw: true, nest: true})
        .then((data) => {
            const createHashedPassword = crypto.createHash("sha512").update(password).digest("base64");
            if(createHashedPassword == data.password){
                res.cookie('userId', data.userId);
                res.cookie('nickname', data.nickname, {
                    maxAge:60*60*1000,
                    path:"/"
                });
                res.send(data);
            }
            else
                throw new Error("no data");
        })
        .catch(err => {
            res.status(500);
            res.json({message: err.message});
            console.error(err);
        });

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
