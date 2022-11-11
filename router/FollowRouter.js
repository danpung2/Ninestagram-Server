const followController = require("../controller/FollowController");


module.exports = app => {
    let router = require("express").Router();

    app.use("/api/follow", router);
    router.get("/following/:userId", followController.findAllFollowing);
    router.get("/follower/:userId", followController.findAllFollower);
    router.post("/", followController.create);
    router.delete("/", followController.deleteFollowing);
};