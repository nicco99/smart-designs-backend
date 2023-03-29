const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/out-of-stock-count").get(controller.listOutOfStockCount).all(methodNotAllowed);
router.route("/price-summary").get(controller.listPriceSummary).all(methodNotAllowed)
router.route("/total-weight-by-product").get(controller.listTotalWeightByProduct).all(methodNotAllowed)
router.route("/:productId").get(controller.read).patch(controller.update).delete(controller.destroy).all(methodNotAllowed);

module.exports = router;
