const router = require("express").Router();
const controller = require("./orders.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Add routes and attach handlers to the router exported by this file.
//route /orders/:orderId
router
  .route("/:orderId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

  //route /orders
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;