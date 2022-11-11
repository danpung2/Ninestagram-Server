const db = require("../models");
const replyRepository = db.reply;

exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const newReply = {
        articleId: req.body.articleId,
        userId: req.body.userId,
        commentId: req.body.commentId,
        content: req.body.content,
        createDate: Date.now()
    };

    replyRepository.create(newReply)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err)
        });
}

exports.findAll = (req, res) => {
    const commentId = req.params.commentId;
    replyRepository.findAll({raw: true, nest: true, where: {commentId: commentId}, order: [['create_date', 'ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.delete = (req, res) => {
    const replyId = req.body.replyId;
    const userId = req.body.userId;
    replyRepository.destroy({where: {replyId: replyId, userId: userId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reply was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete reply with id=${replyId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}
