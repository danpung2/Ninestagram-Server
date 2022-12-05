const articleController = require("../controller/ArticleController");


module.exports = app => {
    let router = require("express").Router();

    app.use("/api/article", router);
    // router.get("/:id", articleController.findOne);
    router.get("/:id", articleController.getAllArticle);
    router.post("/", articleController.create);
    router.put("/", articleController.changeContent);
    router.put("/likeAdd/:articleId", articleController.likeCountAdd);
    router.put("/likeSub/:articleId", articleController.likeCountSub);
    router.delete("/", articleController.delete);
};