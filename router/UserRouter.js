const userController = require("../controller/UserController");


module.exports = app => {
    let router = require("express").Router();

    app.use("/api/user", router);
    router.get("/:id", userController.findOne);
    // router.get("/:id", userController.findAll);
    router.post("/", userController.create);
    // router.post("/:id", userController.resetPassword());
    router.put("/", userController.changePassword);
    router.delete("/:id", userController.delete);
};