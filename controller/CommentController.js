const db = require("../models");
const commentRepository = db.comment;

exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const newComment = {
        articleId: req.body.articleId,
        userId: req.body.userId,
        content: req.body.content,
        createDate: Date.now()
    };

    commentRepository.create(newComment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err)
        });
}

exports.findAllByArticleId = (req, res) => {
    const articleId = req.params.articleId;
    commentRepository.findAll({raw: true, nest: true, where: {articleId: articleId}, order: [['create_date', 'ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.delete = (req, res) => {
    const commentId = req.body.commentId;
    const userId = req.body.userId;

    commentRepository.destroy({where: {commentId: commentId, userId: userId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete comment with id=${commentId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}
