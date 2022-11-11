const db = require("../models");
const articleRepository = db.article;

exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const newArticle = {
        userId: req.body.userId,
        content: req.body.content,
        likeCount: 0,
        createDate: Date.now()
    };

    articleRepository.create(newArticle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err)
        });
}

exports.findAll = (req, res) => {
    articleRepository.findAll({raw: true, nest: true, order: [['create_date', 'DESC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    articleRepository.findOne({where: {articleId: id}, raw: true, nest: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        })
}

exports.changeContent = (req, res) => {
    const articleId = req.body.articleId;
    const userId = req.body.userId;
    const newContent = req.body.content;

    articleRepository.update({content: newContent}, {where: {articleId: articleId, userId: userId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "article was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update article with id=${articleId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}

exports.likeCountAdd = async (req, res) => {
    const articleId = req.params.articleId;

    const article = await articleRepository.findOne({where: {articleId: articleId}});
    const oldCounting = article.likeCount;
    const newCounting = oldCounting + 1;

    articleRepository.update({likeCount: newCounting}, {where: {articleId: articleId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "article was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update article with id=${articleId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}
exports.likeCountSub = async (req, res) => {
    const articleId = req.params.articleId;

    const article = await articleRepository.findOne({where: {articleId: articleId}});
    const oldCounting = article.likeCount;
    if(oldCounting <= 0)
        return;
    const newCounting = oldCounting - 1;

    articleRepository.update({likeCount: newCounting}, {where: {articleId: articleId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "article was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update article with id=${articleId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}
exports.delete = (req, res) => {
    const articleId = req.body.articleId;
    const userId = req.body.userId;

    articleRepository.destroy({where: {articleId: articleId, userId: userId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete article with id=${articleId}. Maybe problem was not found!`
                });
            }
        })
        .catch(err => {
            console.error(err);
        })
}