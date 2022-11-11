const replyController = require("../controller/ReplyController");


module.exports = app => {
    let router = require("express").Router();

    app.use("/api/reply", router);
    router.get("/:commentId", replyController.findAll);
    router.post("/", replyController.create);
    router.delete("/", replyController.delete);
};