const router = require("express").Router({ mergeParams: true });
const controller = require("./categories.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:categoryId").get(controller.read).patch(controller.update).delete(controller.destroy).all(methodNotAllowed);

module.exports = router;
