const commentController = require("../controller/CommentController");


module.exports = app => {
    let router = require("express").Router();

    app.use("/api/comment", router);
    router.get("/:articleId", commentController.findAllByArticleId);
    router.post("/", commentController.create);
    router.delete("/", commentController.delete);
};